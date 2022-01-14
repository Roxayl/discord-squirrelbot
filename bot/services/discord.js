'use strict';

const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const discordConfig = require('./../config/discord.js');

module.exports = class Bootstrap {
    constructor(db) {
        this.client = null;
        this.rest = null;
        this.db = db;
    }

    init() {
        this.startDiscord();
    }

    startDiscord() {
        // Instantiate client and rest objects.
        this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
        this.rest = new REST({ version: '9' }).setToken(discordConfig.token);

        // Fetch all commands in the /commands directory.
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        // Register commands to the server.
        const commands = [];

        for (const file of commandFiles) {
            const command = require(`./../commands/${file}`);
            commands.push(command.data.toJSON());
        }

        // Query API to register application commands.
        (async () => {
            try {
                await this.rest.put(
                    Routes.applicationGuildCommands(discordConfig.clientId, discordConfig.guildId),
                    { body: commands },
                );
                console.log('Successfully registered application commands to Discord.');
            } catch (error) {
                console.error(error);
            }
        })();

        // Fetch all commands from the /commands directory.
        this.client.commands = new Collection();
        for (const file of commandFiles) {
            const command = require(`./../commands/${file}`);
            // Set a new item in the Collection
            // With the key as the command name and the value as the exported module
            this.client.commands.set(command.data.name, command);
        }

        // Debug ready state.
        this.client.once('ready', () => {
            console.log('Ready!');
        });

        // Interact with commands.
        this.client.on('interactionCreate', async interaction => {
            if (!interaction.isCommand()) return;

            const command = this.client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true
                });
            }
        });

        // Finally, we connect the bot to Discord.
        this.client.login(discordConfig.token);
    }
}
