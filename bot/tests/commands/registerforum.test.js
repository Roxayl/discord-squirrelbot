'use strict'

import 'regenerator-runtime/runtime'

jest.setTimeout(12000)

let interaction, forumUser, registerforum

const { DataTypes } = require('sequelize')
const { generateRandomString } = require('../../helpers/util')

const Bootstrap = require('../../services/bootstrap')
const app = new Bootstrap()

const axios = require('axios')
jest.mock('axios')

describe('callRegisterEndpoint', () => {
    beforeAll((done) => {
        app.init().then((app) => {
            Bootstrap.getApp = jest.fn().mockReturnValue(app)

            app.getDataTypes = jest.fn().mockReturnValue(DataTypes)

            registerforum = require('../../commands/registerforum')
            done()
        })
    })

    beforeEach(() => {
        interaction = {
            followUp: jest.fn().mockImplementation(() => true)
        }

        forumUser = {
            validationKey: generateRandomString(12),
            discordId: '123456789',
            forumUsername: 'Lucyane',
            isValidated: false,
            save: jest.fn().mockImplementation(() => true)
        }
    })

    afterAll(() => {
        app.getDb().close()
    })

    describe('on successful post request', () => {
        beforeEach(() => {
            axios.post.mockResolvedValue({
                status: 'success',
                message: 'testing message'
            })
        })

        it('executes without error after success', () => {
            expect(registerforum.callRegisterEndpoint(interaction, forumUser)).resolves.not.toThrow()
        })

        it('posts correct followUp message on success', () => {
            return registerforum.callRegisterEndpoint(interaction, forumUser).then(response => {
                expect(interaction.followUp).toHaveBeenCalledWith({
                    content: 'Private message sent successfully to ' + forumUser.forumUsername + '.',
                    ephemeral: true
                })
            })
        })

        it('returns correct boolean value on resolve on success', () => {
            return registerforum.callRegisterEndpoint(interaction, forumUser).then(response => {
                expect(response).toBe(true)
            })
        })
    })

    describe('on failed post request', () => {
        beforeEach(() => {
            axios.post.mockRejectedValueOnce()
        })

        it('executes without error after failure', () => {
            expect(registerforum.callRegisterEndpoint(interaction, forumUser)).resolves.not.toThrow()
        })

        it('posts correct followUp message on failure', () => {
            return registerforum.callRegisterEndpoint(interaction, forumUser).then(response => {
                expect(interaction.followUp).toHaveBeenCalledWith({
                    content: 'Error when sending private message.',
                    ephemeral: true
                })
            })
        })

        it('returns correct boolean value on resolve on failure', () => {
            return registerforum.callRegisterEndpoint(interaction, forumUser).then(response => {
                expect(response).toBe(false)
            })
        })
    })
})
