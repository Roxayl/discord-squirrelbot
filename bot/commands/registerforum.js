'use strict';

const { SlashCommandBuilder } = require('@discordjs/builders');
const app = require('./../services/bootstrap.js').getApp();
const ForumUser = require('./../models/forumuser.js')(app.getDb(), app.getDataTypes());

module.exports = {
    data: new SlashCommandBuilder()
        .setName('registerforum')
        .setDescription('Links Discord username to forum')
        .addStringOption(option => option.setName('username')
                                         .setDescription('Enter forum username.')),
    async execute(interaction) {
        let user = interaction.options.getUser('target');
        if (!user) {
            user = interaction.user;
        }

        const discordId = user.id;
        const forumUsername = interaction.options.getString('username');
        if (!forumUsername) {
            await interaction.reply({
                content: "Please specify your forum username.",
                ephemeral: true,
                error: true
            });
            return;
        }

        const forumUser = ForumUser.build({
            discordId: discordId,
            forumUsername: forumUsername,
        });
        forumUser.save();

        await interaction.reply({
            content: "Sending private message to " + forumUsername + " for Discord user " + user.tag + ".",
            ephemeral: true
        });
    },
};
