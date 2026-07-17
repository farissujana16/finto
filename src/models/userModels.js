const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
module.exports = sequelize.define(
  "User",
  {
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
  },
  { underscored: true },
);
