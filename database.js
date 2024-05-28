const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
require('dotenv').config();
// import { verifyToken } from './middleware/jwt.js';

const app = express();
const PORT2 = process.env.PORT2;
app.use(bodyParser.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


(async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(10) NOT NULL,
        password VARCHAR(15) NOT NULL,
        rol INT DEFAULT 1
      )
    `);
  } catch (err) {
    console.error('Error creando la tabla', err);
  } finally {
    client.release();
  }
})();

app.post('/createuser', async (req, res) => {
  const datacliente = req.body;

  const username = datacliente.username;
  const password = datacliente.password;

  try {
    const client = await pool.connect();
    await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);
    client.release();
    res.status(200).json({ message: "Usuario creado con éxito" });
    // res.json({ message: "Usuario creado con éxito" });
  } catch (err) {
    console.error('Error en la ejecución de la query', err);
    res.status(500).json({ error: 'Error de servidor' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    if (result.rows.length > 0) {
      return res.status(200).json({ message: "Usuario conectado con exito" });
    } else {
      res.status(401).json({ error: "Credenciales Incorrectas" });
    }
    const token = generateToken({ userId });
    res.json({ token });

  } catch (err) {
    console.error('Error al ejecutar la query', err);
    res.status(500).json({ error: 'Error de servidor' });
  }
});

app.put('/roles/:id', async (req, res) => {
  const usuarioId = req.params.id;
  const rol = req.body.rol;
  try {
    const client = await pool.connect();
    await client.query(`UPDATE users SET rol = '${rol}' WHERE id = ${usuarioId}`);
    client.release();
    res.json({ message: 'Rol modificado correctamente' });
  } catch (err) {
    console.error('Error al ejecutar la query', err);
    res.status(500).json({ error: 'Error al modificar el rol' });
  }
});

(async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS temperatura(
        id SERIAL PRIMARY KEY,
        temperatura FLOAT NOT NULL,
        timestamp TIMESTAMP DEFAULT NOW()
      )
    `);
  } catch (err) {
    console.error('Error creando la tabla', err);
  } finally {
    client.release();
  }
})();

app.post('/temperatura', async (req, res) => {
  const { valor } = req.body;
  console.log('Temperatura recibida base de datos:', valor);
   try {
     const client = await pool.connect();
     await client.query('INSERT INTO temperatura (temperatura) VALUES ($1)', [valor]);
     client.release();
     res.json({ message: 'Temperatura guardada correctamente' });
   } catch (err) {
     console.error('Error al insertar la temperatura', err);
     res.status(500).json({ error: 'Error al insertar la temperatura' });
   }
});


app.listen(PORT2, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT2}`);
});
