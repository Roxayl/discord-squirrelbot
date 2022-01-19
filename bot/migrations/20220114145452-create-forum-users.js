'use strict'

module.exports = {

    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ForumUsers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            discordId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            forumUsername: {
                allowNull: false,
                type: Sequelize.STRING
            },
            validationKey: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true
            },
            isValidated: {
                allowNull: false,
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('ForumUsers')
    }

}
