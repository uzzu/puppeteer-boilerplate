import {CancellationToken} from "./Cancellable";
import {Page} from "puppeteer";
import {getLogger} from "log4js";
import {randomBetween} from "./utils";

const logger = getLogger("GoogleAccount");

export default class GoogleAccount {

    private static BASE_URL = "https://accounts.google.com";
    private static MYACCOUNT_URL = "https://myaccount.google.com";

    private readonly token: CancellationToken;
    private readonly page: Page;

    constructor(token: CancellationToken, page: Page) {
        this.token = token;
        this.page = page;
    }

    async signin(username: string, password: string): Promise<void> {
        await this.signout();

        logger.debug("signin page");
        await this.page.goto(GoogleAccount.BASE_URL);
        await this.page.waitFor(randomBetween(1000, 3000));

        logger.debug("find another account element");
        const anotherAccountElements = await this.page.$x("//div[contains(text(), '別のアカウントを使用')]");
        if (anotherAccountElements.length > 0) {
            logger.debug("another account element found");
            await anotherAccountElements[0].click();
            await this.page.waitFor(randomBetween(1000, 5000));
        }

        logger.debug("input username");
        await this.page.type("input[type=email]", username);
        await this.page.click("div#identifierNext");
        await this.page.waitFor(randomBetween(1000, 5000));

        logger.debug("input password");
        await this.page.type("input[type=password]", password);
        await this.page.click("div#passwordNext");

        logger.debug("waiting for MFA");
        await this.page.waitFor(randomBetween(15000, 30000));

        logger.debug("check signed in");
        if (!this.page.url().startsWith(GoogleAccount.MYACCOUNT_URL)) {
            throw Error(`unexpected page: ${this.page.url()}`)
        }

        logger.debug("signin finished");
    }

    async signout(): Promise<void> {
        logger.debug("signout");
        await this.page.goto(`${GoogleAccount.BASE_URL}/Logout`);
        await this.page.waitFor(randomBetween(3000, 5000));
    }
}