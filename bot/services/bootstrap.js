'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('./../config/database_env.js');
const Discord = require('./discord');

module.exports = class Bootstrap {
    #sequelize;
    #dataTypes;
    #discord;
    static #app;

    constructor() {
        this.#sequelize = null;
        this.#dataTypes = null;
        this.#discord   = null;

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
                console.log('Connection to the database has been established successfully.');
            })
            .catch((err) => {
                console.log('Unable to connect to the database:', err);
                throw err;
            });
    }

    getDiscord() {
        if (this.#discord === null) {
            this.#discord = new Discord(this.#sequelize);
        }
        return this.#discord;
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
