'use strict';

const { SlashCommandBuilder } = require('@discordjs/builders');
const app = require('./../services/bootstrap').getApp();
const https = require('https');
const ForumUser = require('./../models/forumuser')(app.getDb(), app.getDataTypes());
const servicesConfig = require('./../config/services');

const callRegisterEndpoint = async (interaction, forumUsername, discordId) => {
    const data = new TextEncoder().encode(
        JSON.stringify({
            authKey: servicesConfig.register.auth.key,
            username: forumUsername,
            discordId: discordId
        })
    );

    // Set HTTP options and payload.
    let options = servicesConfig.register.requestOptions;
    options.headers = {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    };

    // Create request.
    const request = https.request(options, (response) => {
        console.log(`statusCode: ${response.statusCode}`);

        response.on('data', d => {
            process.stdout.write(d);
        });

        if(response.statusCode !== 200) {
            interaction.followUp({
                content: "Error when sending private message.",
                ephemeral: true
            });
        }
    });

    request.on('error', (error) => {
        console.error(error);
        interaction.followUp({
            content: "Error when sending private message.",
            ephemeral: true
        });
    });

    request.write(data);
    request.end();
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

        const forumUser = ForumUser.build({
            discordId: discordId,
            forumUsername: forumUsername,
        });
        await forumUser.save();

        await interaction.reply({
            content: "Sending private message to " + forumUsername + " for Discord user " + user.tag + ".",
            ephemeral: true
        });

        callRegisterEndpoint(interaction, forumUsername, discordId);
    },

};
