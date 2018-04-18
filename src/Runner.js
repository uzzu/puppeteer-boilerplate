const puppeteer = require('puppeteer');
const log4js = require('log4js');

const Cancellable = require('./Cancellable');
const utils = require('./utils');

const logger = log4js.getLogger();
logger.level = 'debug';

class Option {
    constructor() {
        // write parameters here
    }
}

class Runner {

    /**
     * @param {!Option} option
     */
    constructor(option) {
        this._option = option;
        /**
         * @type {!Date}
         */
        this._date = new Date();
        /**
         * @type {!Cancellable}
         */
        this._cancellable = new Cancellable();

        /**
         * @type {Array<!Browser>} browsers;
         */
        this._browsers = [];
    }

    async run() {
        try {
            await this._process(this._cancellable.token);
        } catch(e) {
            logger.error(e);
        } finally {
            await this._closeBrowserAll();
        }
    }

    /**
     * @private
     * @param {!CancellationToken} token
     * @return !{Promise}
     */
    async _process(token) {
        const browser = await puppeteer.launch();
        this._browsers.push(browser);
        
        // write automation code here
    }

    requestProcessShouldExit() {
        this._cancellable.cancel();
    }

    async _closeBrowserAll() {
        for (let i = 0; i < this._browsers.length; i++) {
            const browser = this._browsers[i];
            try {
                await browser.close();
            } catch(e) {
                logger.error(e);
            }
        }
    }
}

Runner.Option = Option;

module.exports = Runner;

