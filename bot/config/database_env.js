'use strict'

// Require dotenv from database_env.js specifically so that the correct .env file is parsed
// when executing from the Sequelize CLI.
require('dotenv').config({ path: '/app/.env' })

const env = process.env.NODE_ENV
const config = require('./database')

module.exports = {
    user: config[env].username,
    password: config[env].password,
    db: config[env].database,
    settings: {
        host: config[env].host,
        port: config[env].port,
        dialect: config[env].dialect,
        pool: {
            max: 15,
            min: 5,
            idle: 20000,
            evict: 15000,
            acquire: 30000
        }
    }
}
