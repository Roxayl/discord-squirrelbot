'use strict';

const webappConfig = require('./../config/webapp');

module.exports = class Controller {
    constructor(req, res) {
        this.request = req;
        this.response = res;
    }

    static #generatePath(path) {
        if(typeof path === 'undefined') {
            path = '';
        } else {
            path = '/' + path;
        }
        return path;
    }

    url(path) {
        path = Controller.#generatePath(path);
        return this.request.protocol + '://' + this.request.get('host') + path;
    }

    static url(path) {
        path = Controller.#generatePath(path);
        const url = webappConfig.url;
        return url + path;
    }

    fullUrl() {
        this.request.protocol + '://' + this.request.get('host') + this.request.originalUrl;
    }
}
