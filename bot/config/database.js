require('dotenv').config({ path: '/app/.env' });

module.exports = {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME + "_dev",
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "dialect": "mysql"
    },
    "test": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME + "_test",
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "dialect": "mysql"
    },
    "production": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "dialect": "mysql"
    },
};
