'use strict'

const fs = require('fs')
const { Client, Collection, Intents } = require('discord.js')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const discordConfig = require('./../config/discord')

module.exports = class Discord {
    /**
     * @type {Client}
     */
    #client;

    /**
     * @type {REST}
     */
    #rest;

    /**
     * @type {import('sequelize').Sequelize}
     */
    #db;

    constructor (db) {
        this.#client = null
        this.#rest = null
        this.#db = db
    }

    /**
     * Start Discord bot.
     */
    init () {
        this.#startDiscord()
    }

    /**
     * Returns the Client instance from Discord.js.
     * @returns {Client}
     */
    getClient () {
        return this.#client
    }

    /**
     * Start Discord bot, register commands, and listen to specific events.
     */
    #startDiscord () {
        // Instantiate client and rest objects.
        this.#client = new Client({ intents: [Intents.FLAGS.GUILDS] })
        this.#rest = new REST({ version: '9' }).setToken(discordConfig.token)

        // Fetch all commands in the /commands directory.
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

        // Register commands to the server.
        const commands = []

        for (const file of commandFiles) {
            const command = require(`./../commands/${file}`)
            commands.push(command.data.toJSON())
        }

        // Query API to register application commands.
        (async () => {
            try {
                await this.#rest.put(
                    Routes.applicationGuildCommands(discordConfig.clientId, discordConfig.guildId),
                    { body: commands }
                )
                console.log('[discord] Successfully registered application commands to Discord.')
            } catch (error) {
                console.error(error)
            }
        })()

        // Fetch all commands from the /commands directory.
        this.#client.commands = new Collection()
        for (const file of commandFiles) {
            const command = require(`./../commands/${file}`)
            console.log("[discord] Registering command '" + command.data.name + "'...")
            // Set a new item in the Collection
            // With the key as the command name and the value as the exported module
            this.#client.commands.set(command.data.name, command)
        }

        // Debug ready state.
        this.#client.once('ready', () => {
            console.log('[discord] Bot is ready to respond to commands.')
        })

        // Interact with commands.
        this.#client.on('interactionCreate', async (interaction) => {
            if (!interaction.isCommand()) return

            const command = this.#client.commands.get(interaction.commandName)

            if (!command) return

            try {
                await command.execute(interaction)
            } catch (error) {
                console.error(error)
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true
                })
            }
        })

        // Finally, we connect the bot to Discord.
        this.#client.login(discordConfig.token)
    }
}
