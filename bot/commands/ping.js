'use strict'

const { SlashCommandBuilder } = require('@discordjs/builders')
const { generateRandomString } = require('./../helpers/util')

module.exports = {

    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),

    async execute (interaction) {
        const random = generateRandomString(8)
        return interaction.reply({
            content: 'Pong! ``(' + random + ')``',
            ephemeral: true
        })
    }

}
