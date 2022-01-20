'use strict'

const { generateRandomString } = require('../../helpers/util')

test('generates a 12-character string', () => {
    expect(generateRandomString(12).length).toBe(12)
})

test('generates a 2-character string', () => {
    expect(generateRandomString('2').length).toBe(2)
})

test('throws error when passing a wrong length value', () => {
    expect(() => {
        return generateRandomString(-1).length
    }).toThrowError(RangeError)
})
