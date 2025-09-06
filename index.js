const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a la DB y modelo de Usuario
const sequelize = require("./db/database");
const Usuario = require("./db/Usuario");

// Sincronizar la base de datos
sequelize.sync().then(() => {
  console.log("Base de datos sincronizada ✅");
});

// Endpoint raíz
app.get("/", (req, res) => {
  res.send("UNUM Identity API funcionando 🚀");
});

// GET todos los usuarios
app.get("/usuarios", async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
});

// GET usuario por id
app.get("/usuarios/:id", async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json(usuario);
});

// POST crear usuario
app.post("/usuarios", async (req, res) => {
  const { nombre } = req.body;
  const nuevoUsuario = await Usuario.create({ nombre });
  res.status(201).json(nuevoUsuario);
});

// PUT actualizar usuario
app.put("/usuarios/:id", async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
  usuario.nombre = req.body.nombre || usuario.nombre;
  await usuario.save();
  res.json(usuario);
});

// DELETE usuario
app.delete("/usuarios/:id", async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
  await usuario.destroy();
  res.status(204).send();
});

// Levantar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
