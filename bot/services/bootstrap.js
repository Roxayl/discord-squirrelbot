'use strict';

const { Sequelize } = require('sequelize');
const dbConfig = require('./../config/database_env.js');
const Discord = require('./discord');

module.exports = class Bootstrap {
    constructor() {
        this.sequelize = null;
        this.discord = null;
    }

    init() {
        this.fetchEnvironment();
        this.startDb();
    }

    fetchEnvironment() {
        require('dotenv').config({ path: '/app/.env' });
    }

    startDb() {
        console.log("Database configuration : ", dbConfig);

        this.sequelize = new Sequelize(
            dbConfig.db, dbConfig.user, dbConfig.password, dbConfig.settings);

        sequelize.authenticate()
            .then(() => {
                console.log('Connection to the database has been established successfully.');
            })
            .catch((err) => {
                console.log('Unable to connect to the database:', err);
                throw err;
            });
    }

    getDiscord() {
        if (this.discord === null) {
            this.discord = new Discord(this.db);
        }
        return this.discord;
    }

    getDb() {
        return this.db;
    }
}
