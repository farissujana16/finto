const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');

const User = require('./userModels');

const RefreshToken = sequelize.define(
  'RefreshToken',
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    underscored: true,
    paranoid: true,
  }
);

RefreshToken.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(RefreshToken, {
  foreignKey: 'user_id',
});

module.exports = RefreshToken;