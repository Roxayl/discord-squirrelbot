'use strict';

const Controller = require('./controller');
const discordConfig = require('../config/discord');
const { GuildMember } = require('discord.js');

module.exports = class ForumValidationController extends Controller {
    constructor(request, response) {
        super(request, response);

        const manageErrors = (err) => {
            console.log(err);
            this.response.json({
                status: 'error',
                message: 'An error occurred: [' + err.name + '] ' + err.message
            });
        };

        try {
            this.run()
                .catch((err) => manageErrors(err));
        } catch (err) {
            manageErrors(err);
        }
    }

    async run() {
        const app = require('./../services/bootstrap').getApp();
        const ForumUser = require('../models/forumuser')(app.getDb(), app.getDataTypes());

        const validationKey = this.request.query.validationKey;

        const user = await ForumUser.findOne({
            where: { validationKey: validationKey }
        });

        if (user === null) {
            this.response.json({ status: 'error', message: 'Validation key does not exist.' });
            return;
        }

        const client = app.getDiscord().getClient();
        const guild = client.guilds.cache.get(discordConfig.guildId);
        const roleForumGC = '328500694468263938';
        const role = guild.roles.cache.get(roleForumGC);

        /**
         * @type {GuildMember}
         */
        const member = await guild.members.fetch(user.discordId);

        console.log('[discord] Adding user ' + member.user.tag + ' to role ' + role.name + '.');
        await member.roles.add(role);

        user.isValidated = true;
        await user.save();

        this.response.json({
            status: 'success',
            message: 'Role attributed successfully to Discord user ' + member.user.tag + '.'
        });
    }
}
