'use strict';

module.exports = {
    
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ForumUsers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id: {
                type: Sequelize.INTEGER
            },
            discordId: {
                type: Sequelize.STRING
            },
            forumUsername: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('ForumUsers');
    }

};
