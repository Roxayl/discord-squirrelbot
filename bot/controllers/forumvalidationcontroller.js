'use strict';

const Controller = require('./controller');

module.exports = class ForumValidationController extends Controller {
    constructor(request, response) {
        super(request, response);

        this.getResponse().send('Lucyane');
    }
}
