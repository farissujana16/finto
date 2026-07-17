const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./userModels");
const Categories = require("./categoriesModels");

const Budget = sequelize.define(
  "Budget",
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
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    limitAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    periodMonth: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    periodYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
Budget.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasMany(Budget, {
  foreignKey: "userId",
  as: "budgets",
});

Budget.belongsTo(Categories, {
  foreignKey: "categoryId",
  as: "category",
});

Categories.hasMany(Budget, {
  foreignKey: "categoryId",
  as: "budgets",
});

module.exports = Budget;
