'use strict';

const express = require('express');
const webappConfig = require('./../config/webapp');

module.exports = class Webapp {
    #app;
    #port;

    constructor() {
        this.#port = webappConfig.port;
    }

    init() {
        this.#app = express();

        this.#app.listen(this.#port, () => {
            console.log('Webapp services listening on port ' + this.#port + '.');
        });

        this.#app.get('/', (req, res) => {
            res.send('Lucyane');
        });
    }
}
