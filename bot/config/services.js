'use strict';

module.exports = {
    register: {
        requestOptions: {
            hostname: process.env.REGISTER_ENDPOINT_HOST,
            port: process.env.REGISTER_ENDPOINT_PORT,
            path: process.env.REGISTER_ENDPOINT_PATH,
            method: 'POST'
        },
        auth: {
            key: process.env.REGISTER_ENDPOINT_KEY
        }
    }
};
