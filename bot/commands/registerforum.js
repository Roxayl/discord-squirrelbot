'use strict';

const { SlashCommandBuilder } = require('@discordjs/builders');
const { generateRandomString } = require('./../helpers/util');
const app = require('./../services/bootstrap').getApp();
const axios = require('axios');
const ForumUser = require('./../models/forumuser')(app.getDb(), app.getDataTypes());
const servicesConfig = require('./../config/services');
const Controller = require('../controllers/controller');

const callRegisterEndpoint = async (interaction, forumUser) => {
    const useTls = servicesConfig.register.settings.tls != 0;
    let url = useTls ? 'https://' : 'http://';
    url += servicesConfig.register.requestOptions.hostname + '/' + servicesConfig.register.requestOptions.path;

    const validationUrl = Controller.url('discord-forum-validate?validationKey=' + forumUser.validationKey);
    const requestBody = {
        authKey: servicesConfig.register.auth.key,
        username: forumUser.forumUsername,
        discordId: forumUser.discordId,
        validationUrl: validationUrl
    };

    axios.post(url, requestBody, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            console.log(`statusCode: ${response.statusCode}`);
            console.log(response);
            interaction.followUp({
                content: "Private message sent successfully to " + forumUser.forumUsername + ".",
                ephemeral: true
            });
        })
        .catch((error) => {
            console.error(error);
            interaction.followUp({
                content: "Error when sending private message.",
                ephemeral: true
            });
        });
};

module.exports = {

    data: new SlashCommandBuilder()
        .setName('registerforum')
        .setDescription('Links Discord username to forum')
        .addStringOption(option => option.setName('username')
            .setDescription('Enter forum username.')
        ),

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

        const validationKey = generateRandomString(12);

        const forumUser = ForumUser.build({
            discordId: discordId,
            forumUsername: forumUsername,
            validationKey: validationKey,
            isValidated: false
        });
        await forumUser.save();

        await interaction.reply({
            content: "Sending private message to " + forumUsername + " for Discord user " + user.tag + ".",
            ephemeral: true
        });

        callRegisterEndpoint(interaction, forumUser);
    },

};
