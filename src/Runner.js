const puppeteer = require('puppeteer');
const log4js = require('log4js');

const Cancellable = require('./Cancellable');

const logger = log4js.getLogger();
logger.level = 'debug';

class Option {
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
    }

    async run() {
        try {
            await this._process(this._cancellable.token);
        } catch(e) {
           logger.error(e);
        }
    }

    /**
     * @private
     * @param {!CancellationToken} token
     * @return !{Promise}
     */
    async _process(token) {
        // STUB
        return false;
    }

    requestProcessShouldExit() {
        this._cancellable.cancel();
    }
}

Runner.Option = Option

module.exports = Runner;

