'use strict';

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('registerforum')
        .setDescription('Links Discord username to forum'),
    async execute(interaction) {
        throw new Error("Not yet implemented.");
    },
};
