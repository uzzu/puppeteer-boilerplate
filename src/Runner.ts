import puppeteer from "puppeteer";
import * as Log4js from "log4js";

import {Cancellable, CancellationToken} from "./Cancellable";
import * as utils from "./utils";

const logger = Log4js.getLogger();
logger.level = "debug";

export class RunnerOption {
    constructor(
        // write parameters here
    ) { }
}

export class Runner {

    private readonly option: RunnerOption;
    private readonly date: Date;
    private readonly cancellable: Cancellable;
    private browsers: puppeteer.Browser[];

    constructor(option: RunnerOption) {
        this.option = option;
        this.date = new Date();
        this.cancellable = new Cancellable();
        this.browsers = [];
    }

    private async process(token: CancellationToken): Promise<void> {
        const browser = await this.newBrowser();

        // write automation code here
    }

    // region public methods and utilities

    async run() {
        try {
            await this.process(this.cancellable.token);
        } catch(e) {
            logger.error(e);
        } finally {
            await this.closeBrowserAll();
        }
    }

    requestProcessShouldExit() {
        this.cancellable.cancel();
    }

    private async newBrowser(): Promise<puppeteer.Browser> {
        const browser = await puppeteer.launch();
        this.browsers.push(browser);
        return browser;
    }

    private async closeBrowserAll(): Promise<void> {
        const copied = this.browsers;
        this.browsers = [];
        for (const browser of copied) {
            try {
                await browser.close();
            } catch(e) {
                logger.error(e)
            }
        }
    }

    // endregion
}
