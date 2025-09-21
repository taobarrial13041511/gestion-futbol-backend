require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a Supabase
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Endpoint de prueba
app.get("/", (req, res) => {
  res.send("Backend de gestión de fútbol funcionando ⚽");
});

// Listar jugadores
app.get("/jugadores", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM jugadores");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error de conexión");
  }
});

// Listar equipos
app.get("/equipos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM equipos");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error de conexión");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
