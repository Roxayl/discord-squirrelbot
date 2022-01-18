'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class ForumUser extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    ForumUser.init({
        discordId: DataTypes.STRING,
        forumUsername: DataTypes.STRING,
        validationKey: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'ForumUser',
    });

    return ForumUser;

};
