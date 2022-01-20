'use strict'

module.exports = {
    /**
     * Generates a valid hexadecimal-based string.
     * @param {number|string} length String length, necessarily as an integer.
     * @returns {string} Hexadecimal string.
     */
    generateRandomString: (length) => {
        length = parseInt(length)
        if (length < 1 || isNaN(length)) {
            throw new RangeError('Length must be a positive integer.')
        }

        let result = ''
        const characters = '0123456789abcdef'
        const charactersLength = characters.length
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
    }
}
