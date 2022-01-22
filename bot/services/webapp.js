'use strict'

const express = require('express')
const ForumValidationController = require('../controllers/forumvalidationcontroller')
const webappConfig = require('./../config/webapp')

module.exports = class Webapp {
    /**
     * Express app instance.
     * @type {Express}
     */
    #webapp

    /**
     * Port number where the webapp listens for requests.
     * @type {number}
     */
    #port

    /**
     * @type {http.Server}
     */
    #server

    constructor () {
        this.#port = Number.parseInt(webappConfig.port)
        if (process.env.NODE_ENV === 'test') {
            this.#port += 1
        }
    }

    /**
     * Start Express-based app and listen through the port specified in the WEBAPP_PORT environment variable.
     */
    init () {
        console.log('[webapp] Starting Express-based webapp...')

        this.#webapp = express()

        this.router()

        this.#server = this.#webapp.listen(this.#port, () => {
            console.log('[webapp] Webapp services listening on port ' + this.#port + '.')
        })
    }

    /**
     * Register webapp routes.
     */
    router () {
        console.log('[webapp] Registering routes...')

        this.#webapp.get('/discord-forum-validate', (req, res) => new ForumValidationController(req, res))
    }

    getServer () {
        return this.#server
    }
}
