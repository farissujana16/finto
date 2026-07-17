const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./userModels");

const Goal = sequelize.define(
  "Goal",
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
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    targetAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    currentAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
    deadline: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
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

// Relationships
Goal.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasMany(Goal, {
  foreignKey: "userId",
  as: "goals",
});

module.exports = Goal;
