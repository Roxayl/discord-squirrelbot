require('dotenv').config({path: '/app/.env'});

const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const discordConfig = require('./config/discord.js');
const { Sequelize, QueryTypes } = require('sequelize');
const dbConfig = require('./config/database_env.js');

console.log("Database configuration : ", dbConfig);


// DB configuration.
const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, dbConfig.settings);

sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch((err) => {
        console.log('Unable to connect to the database:', err);
    });

// Instantiate client and rest objects.
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const rest = new REST({ version: '9' }).setToken(discordConfig.token);

// Fetch all commands in the /commands directory.
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


// Register commands to the server.
const commands = [];

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

(async () => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(discordConfig.clientId, discordConfig.guildId),
            { body: commands },
        );
        console.log('Successfully registered application commands to Discord.');
    } catch (error) {
        console.error(error);
    }
})();


// Fetch all commands from the /commands directory.
client.commands = new Collection();
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}


// Debug ready state.
client.once('ready', () => {
    console.log('Ready!');
});


// Interact with commands.
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});


// Finally, we connect the bot to Discord.
client.login(discordConfig.token);
