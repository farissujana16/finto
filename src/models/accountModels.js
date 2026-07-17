const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./userModels");

const Account = sequelize.define(
  "Account",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("cash", "bank", "ewallet", "investment"),
      allowNull: false,
      defaultValue: "cash",
    },
    balance: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    colorOne: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    colorTwo: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    underscored: true,
    timestamps: true,
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    },
  },
);

// Relationship
Account.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasMany(Account, {
  foreignKey: "userId",
  as: "accounts",
});

module.exports = Account;
