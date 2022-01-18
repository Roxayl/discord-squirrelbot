'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('./../config/database_env');
const Discord = require('./discord');
const Webapp = require('./webapp');

module.exports = class Bootstrap {
    #discord;
    #webapp;
    #sequelize;
    #dataTypes;
    static #app;

    constructor() {
        this.#discord   = null;
        this.#webapp    = null;
        this.#sequelize = null;
        this.#dataTypes = null;

        Bootstrap.#app = this;

        this.init();
    }

    init() {
        this.fetchEnvironment();
        this.startDb();
    }

    fetchEnvironment() {
        require('dotenv').config({ path: '/app/.env' });
    }

    startDb() {
        this.#sequelize = new Sequelize(
            dbConfig.db, dbConfig.user, dbConfig.password, dbConfig.settings);
        this.#dataTypes = DataTypes;

        this.#sequelize.authenticate()
            .then(() => {
                console.log('[database] Connection to the database has been established successfully.');
            })
            .catch((err) => {
                console.log('[database] Unable to connect to the database:', err);
                throw err;
            });
    }

    getDiscord() {
        if (this.#discord === null) {
            this.#discord = new Discord(this.#sequelize);
        }
        return this.#discord;
    }

    getWebapp() {
        if (this.#webapp === null) {
            this.#webapp = new Webapp();
        }
        return this.#webapp;
    }

    getDb() {
        return this.#sequelize;
    }

    getDataTypes() {
        return this.#dataTypes;
    }

    static getApp() {
        return Bootstrap.#app;
    }
}
