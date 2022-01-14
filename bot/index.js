'use strict';

const Bootstrap = require('./services/bootstrap');

let app = new Bootstrap();

let discord = app.getDiscord();
discord.init();
