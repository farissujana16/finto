const { Sequelize } = require("sequelize");

let sequelize;
let isProduction = process.env.NODE_ENV === "production";

if (process.env.DB_DIALECT === "sqlite") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: isProduction ? false : console.log,
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_DIALECT,
      logging: isProduction ? false : console.log,
    },
  );
}

module.exports = sequelize;
