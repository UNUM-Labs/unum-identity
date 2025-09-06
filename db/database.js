const { Sequelize } = require("sequelize");

// Conexión a SQLite (archivo local)
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/unum.sqlite"
});

module.exports = sequelize;
