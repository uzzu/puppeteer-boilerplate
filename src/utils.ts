/**
 * @param {number} milliSeconds
 * @return {!Promise}
 */
export function sleep(milliSeconds): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, milliSeconds));
}

/**
 *
 * @param {number} min minimum milliseconds
 * @param {number} max maximum milliseconds
 * @return {!Promise}
 */
export function sleepRandom(min, max): Promise<void> {
    return new Promise<void>(resolve => {
        const milliSeconds = Math.floor(Math.random() * (max - min + 1) + min);
        setTimeout(resolve, milliSeconds);
    });
}
