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
     * @type {number|string}
     */
    #port

    constructor () {
        this.#port = webappConfig.port
    }

    /**
     * Start Express-based app and listen through the port specified in the WEBAPP_PORT environment variable.
     */
    init () {
        console.log('[webapp] Starting Express-based webapp...')

        this.#webapp = express()

        this.router()

        this.#webapp.listen(this.#port, () => {
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
}
