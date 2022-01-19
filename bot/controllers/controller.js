'use strict';

const webappConfig = require('./../config/webapp');

module.exports = class Controller {
    constructor(req, res) {
        this.request = req;
        this.response = res;
    }

    /**
     * Formats a path, in order to be used with {@link url}.
     * @param path
     * @returns {string}
     */
    static #generatePath(path) {
        if(typeof path === 'undefined') {
            path = '';
        } else {
            path = '/' + path;
        }
        return path;
    }

    /**
     * Generates a URL to access the web app, with a specific path.
     * @param path Path starting from the base URL.
     * @returns {string}
     */
    url(path) {
        path = Controller.#generatePath(path);
        return this.request.protocol + '://' + this.request.get('host') + path;
    }

    /**
     * Generates a URL to access the web app, with a specific path.
     * @param path Path starting from the base URL.
     * @returns {string}
     */
    static url(path) {
        path = Controller.#generatePath(path);
        const url = webappConfig.url;
        return url + path;
    }

    /**
     * Generates the full URL coming from the request.
     */
    fullUrl() {
        return this.request.protocol + '://' + this.request.get('host') + this.request.originalUrl;
    }
}
