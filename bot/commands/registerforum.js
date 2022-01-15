'use strict';

const { SlashCommandBuilder } = require('@discordjs/builders');
const app = require('./../services/bootstrap.js').getApp();
const ForumUser = require('./../models/forumuser.js')(app.getDb(), app.getDataTypes());

module.exports = {
    data: new SlashCommandBuilder()
        .setName('registerforum')
        .setDescription('Links Discord username to forum'),
    async execute(interaction) {
        const discordId = "12345";
        const forumUsername = "Roxel";

        const forumUser = ForumUser.build({
            discordId: discordId,
            forumUsername: forumUsername,
        });
        forumUser.save();
    },
};
