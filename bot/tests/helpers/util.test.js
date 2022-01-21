'use strict'

const { generateRandomString } = require('../../helpers/util')

describe('generateRandomString', () => {
    it('generates a 12-character string', () => {
        expect(generateRandomString(12).length).toBe(12)
    })

    it('generates a 2-character string', () => {
        expect(generateRandomString('2').length).toBe(2)
    })

    it('throws error when passing a wrong length value', () => {
        expect(() => {
            return generateRandomString(-1)
        }).toThrowError(RangeError)
    })
})
