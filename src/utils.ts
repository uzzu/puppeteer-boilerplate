export function randomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function sleep(milliSeconds): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, milliSeconds));
}

/**
 * @param min minimum milliseconds
 * @param max maximum milliseconds
 */
export function sleepRandom(min: number, max: number): Promise<void> {
    return new Promise<void>(resolve => {
        const milliSeconds = randomBetween(min, max);
        setTimeout(resolve, milliSeconds);
    });
}
