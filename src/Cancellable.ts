export class Cancellable {

    readonly token: CancellationToken;
    private cancellationRequested: boolean;
    private errorOnCancelled: Error | null;

    constructor() {
        this.token = new CancellationToken(this);
        this.cancellationRequested = false;
        this.errorOnCancelled = null;
    }

    get isCancellationRequested() {
        return this.cancellationRequested;
    }

    /**
     * @throws CancellationRequestedError
     */
    validateNotCancelled() {
        if (this.cancellationRequested && this.errorOnCancelled != null) {
            throw new CancellationRequestedError('Already cancelled.', this.errorOnCancelled);
        }
    }

    rejectIfCancelled(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (this.cancellationRequested && this.errorOnCancelled != null ) {
                reject(new CancellationRequestedError('Already cancelled.', this.errorOnCancelled));
                return;
            }
            resolve();
        });
    }

    cancel(message: string = "cancellation requested") {
        if (this.cancellationRequested) {
            return;
        }
        this.cancellationRequested = true;
        this.errorOnCancelled = new Error(message);
    }
}

export class CancellationToken {

    private readonly source: Cancellable;

    constructor(source: Cancellable) {
        this.source = source;
    }

    get isCancellationRequested(): boolean {
        return this.source.isCancellationRequested;
    }

    /**
     * @throws CancellationRequestedError
     */
    validateNotCancelled() {
        this.source.validateNotCancelled();
    }

    rejectIfCancelled(): Promise<void> {
        return this.source.rejectIfCancelled();
    }
}

export class CancellationRequestedError extends Error {
    readonly errorOnCancelled: Error;

    constructor(message: string, errorOnCancelled: Error) {
        super(message);
        this.errorOnCancelled = errorOnCancelled;
    }
}
