'use strict'

const { Sequelize, DataTypes } = require('sequelize')
const dbConfig = require('./../config/database_env')
const Discord = require('./discord')
const Webapp = require('./webapp')

module.exports = class Bootstrap {
    /**
     * @type {Discord}
     */
    #discord

    /**
     * @type {Webapp}
     */
    #webapp

    /**
     * @type {Sequelize}
     */
    #sequelize

    #dataTypes

    /**
     * @type {Bootstrap}
     */
    static #app

    constructor () {
        this.#discord = null
        this.#webapp = null
        this.#sequelize = null
        this.#dataTypes = null

        Bootstrap.#app = this

        this.init()
    }

    init () {
        this.fetchEnvironment()
        this.startDb()
    }

    /**
     * Load .env file and store environment variables to be accessed through process.env.
     */
    fetchEnvironment () {
        require('dotenv').config({ path: '/app/.env' })
    }

    /**
     * Initialize database connection and set the {@link #sequelize} object and {@link #dataTypes} class.
     */
    startDb () {
        this.#sequelize = new Sequelize(
            dbConfig.db, dbConfig.user, dbConfig.password, dbConfig.settings)
        this.#dataTypes = DataTypes

        this.#sequelize.authenticate()
            .then(() => {
                console.log('[database] Connection to the database has been established successfully.')
            })
            .catch((err) => {
                console.log('[database] Unable to connect to the database:', err)
                throw err
            })
    }

    /**
     * Returns a {@link Discord} instance.
     * @returns {Discord}
     */
    getDiscord () {
        if (this.#discord === null) {
            this.#discord = new Discord(this.#sequelize)
        }
        return this.#discord
    }

    /**
     * Returns a {@link Webapp} instance.
     * @returns {Webapp}
     */
    getWebapp () {
        if (this.#webapp === null) {
            this.#webapp = new Webapp()
        }
        return this.#webapp
    }

    /**
     * Returns a {@link Sequelize} instance.
     * @returns {Sequelize}
     */
    getDb () {
        return this.#sequelize
    }

    getDataTypes () {
        return this.#dataTypes
    }

    /**
     * Returns the current created app instance. This static method works as a singleton getter.
     * @returns {Bootstrap}
     */
    static getApp () {
        return Bootstrap.#app
    }
}
