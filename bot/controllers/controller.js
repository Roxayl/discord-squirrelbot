'use strict';

module.exports = class Controller {
    #request;
    #response;

    constructor(request, response) {
        this.#request = request;
        this.#response = response;
    }

    getResponse() {
        return this.#request;
    }

    getRequest() {
        return this.#response;
    }

    static url() {
        request = this.#request;
        request.protocol + '://' + request.get('host') + request.originalUrl;
    }
}
