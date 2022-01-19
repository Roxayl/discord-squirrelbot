'use strict'

module.exports = {
    /**
     * Generates a valid hexadecimal-based string.
     * @param {number} length String length, necessarily as an integer.
     * @returns {string} Hexadecimal string.
     */
    generateRandomString: (length) => {
        let result = ''
        const characters = '0123456789abcdef'
        const charactersLength = characters.length
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
    }
}
