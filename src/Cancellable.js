class Cancellable {

    constructor() {
        /**
         * @private
         * @type {!CancellationToken}
         */
        this._token = new CancellationToken(this);
        /**
         * @private
         * @type {boolean}
         */
        this._cancellationRequested = false;
        /**
         * @private
         * @type {Error|null}
         */
        this._errorOnCancelled = null;
    }

    /**
     * @return {CancellationToken}
     */
    get token() {
        return this._token;
    }

    /**
     * @return {boolean}
     */
    get isCancellationRequested() {
        return this._cancellationRequested;
    }

    /**
     * @throws {!CancellationRequestedError}
     */
    validateNotCancelled() {
        if (!this._cancellationRequested) { return; }
        throw new CancellationRequestedError('Already cancelled.', this._errorOnCancelled);
    }

    /**
     * @return {!Promise}
     */
    rejectIfCancelled() {
        return new Promise((resolve, reject) => {
            if (!this._cancellationRequested) {
                resolve();
                return;
            }
            reject(new CancellationRequestedError('Already cancelled.', this._errorOnCancelled));
        });
    }

    /**
     * @param {string|null} message
     */
    cancel(message) {
        if (this._cancellationRequested) { return; }
        this._cancellationRequested = true;
        message = message || 'cancellation requested';
        this._errorOnCancelled = new Error(message);
    }
}

class CancellationToken {

    /**
     * @param {!Cancellable} source
     */
    constructor(source) {
        this._source = source;
    }

    /**
     * @return {boolean}
     */
    get isCancellationRequested() {
        return this._source.isCancellationRequested;
    }

    /**
     * @throws {!CancellationRequestedError}
     */
    validateNotCancelled() {
        this._source.validateNotCancelled();
    }

    /**
     * @return {!Promise}
     */
    rejectIfCancelled() {
        return this._source.rejectIfCancelled();
    }
}

class CancellationRequestedError extends Error {
    /**
     * @param {string} message
     * @param {Error} errorOnCancelled
     */
    constructor(message, errorOnCancelled) {
        super(message);
        this._errorOnCancelled = errorOnCancelled;
    }

    /**
     * @return {Error}
     */
    errorOnCancelled() {
        return this._errorOnCancelled;
    }
}

Cancellable.CancellationRequestedError = CancellationRequestedError;

module.exports = Cancellable;

