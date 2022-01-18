'use strict';

const Bootstrap = require('./services/bootstrap');

let app = new Bootstrap();

app.getDiscord().init();

app.getWebapp().init();
