const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Usuario = sequelize.define("Usuario", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Usuario;
