const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Dashboard = sequelize.define('Dashboard', { name: { type: DataTypes.STRING }, description: { type: DataTypes.TEXT } }, { underscored: true, paranoid: true, defaultScope: { attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } } });
module.exports = Dashboard;