/**
 * @param {number} milliSeconds
 * @return {!Promise}
 */
function sleep(milliSeconds) {
    return new Promise(resolve => setTimeout(resolve, milliSeconds));
}

/**
 *
 * @param {number} min minimum milliseconds
 * @param {number} max maximum milliseconds
 * @return {!Promise}
 */
function sleepRandom(min, max) {
    return new Promise(resolve => {
        const milliSeconds = Math.floor(Math.random() * (max - min + 1) + min);
        setTimeout(resolve, milliSeconds);
    });
}

module.exports = {
    sleep: sleep,
    sleepRandom: sleepRandom
};
