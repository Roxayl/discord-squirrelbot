'use strict';

const Bootstrap = require('./services/bootstrap');
const { DataTypes } = require("sequelize");

let app = new Bootstrap();

let discord = app.getDiscord();
discord.init();
