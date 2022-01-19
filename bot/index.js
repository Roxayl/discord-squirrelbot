'use strict'

const Bootstrap = require('./services/bootstrap')

const app = new Bootstrap()

app.getDiscord().init()

app.getWebapp().init()
