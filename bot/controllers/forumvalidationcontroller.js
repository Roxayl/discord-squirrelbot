'use strict';

const Controller = require('./controller');

module.exports = class ForumValidationController extends Controller {
    constructor(request, response) {
        super(request, response);

        this.response.send('<h3>Lucyane</h3><br>'
            + this.url('coucou') + '<br>' + Controller.url('coucou'));
    }
}
