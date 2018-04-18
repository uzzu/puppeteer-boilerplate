'use strict';

const assert = require('power-assert');
const Cancellable = require('./../src/Cancellable');

describe('Cancellable', () => {
    describe('defaults', () => {
        const actual = new Cancellable();
        it('should not requested', () => {
            assert(actual.isCancellationRequested === false);
        });
        it('validation should not throw Error', () => {
            assert.doesNotThrow(actual.validateNotCancelled.bind(actual));
        });
        it('rejectIfCancelled should be resolve', () => {
            return actual.rejectIfCancelled().then(
                () => {
                    assert.ok(true);
                },
                error => {
                    assert.fail(error);
                });
        });
        it('token should same states', () => {
            assert(actual.token.isCancellationRequested === actual.isCancellationRequested);
        });
    });

    describe('cancellation requested', () => {
        const actual = new Cancellable();
        actual.cancel();
        it('should be true', () => {
            assert(actual.isCancellationRequested === true);
        });
        it('validation should throw CancellationRequestedError', () => {
            assert.throws(actual.validateNotCancelled.bind(actual), Cancellable.CancellationRequestedError);
        });
        it('rejectIfCancelled should be reject', () => {
            return actual.rejectIfCancelled().then(
                () => {
                    assert.fail('resolve called');
                },
                error => {
                    assert.ok(true);
                });
        });
        it('token should same states', () => {
            assert(actual.token.isCancellationRequested === actual.isCancellationRequested);
        });
    });
});

