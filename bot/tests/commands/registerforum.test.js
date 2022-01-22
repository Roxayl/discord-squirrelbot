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
            followUp: () => true
        }

        forumUser = {
            validationKey: generateRandomString(12),
            discordId: '123456789',
            forumUsername: 'Lucyane',
            isValidated: false,
            save: jest.fn().mockReturnValue(true)
        }
    })

    afterAll(() => {
        app.getDb().close()
    })

    it('function executes without error after success', async () => {
        axios.post.mockResolvedValue({
            status: 'success',
            message: 'testing message'
        })

        expect(async () => {
            await registerforum.callRegisterEndpoint(interaction, forumUser)
        }).not.toThrow()
    })

    it('function executes without error after failure', () => {
        axios.post.mockRejectedValueOnce()

        expect(async () => {
            await registerforum.callRegisterEndpoint(interaction, forumUser)
        }).not.toThrow()
    })
})
