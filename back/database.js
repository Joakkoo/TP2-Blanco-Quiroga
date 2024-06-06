const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
require('dotenv').config();

const cors = require('cors')
const app = express();
app.use(cors());
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const PORT2 = process.env.PORT2;
app.use(bodyParser.json());



const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }
  
    const token = authHeader.split(' ')[1];
  
    jwt.verify(token, JWT_SECRET, async(err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token inválido' });
      }

      try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users WHERE id = $1', [decoded.id]);
        client.release();
        if (result.rows.length === 0) {
          // Si el usuario no existe o las credenciales son incorrectas, responde con un error 401
          return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
        req.user = result.rows[0];
        console.log(req.user);
        next()
      } catch (error) {
        res.status(503).send({message:"No se encontro usuario."})
      }

    });
  };

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
  console.log(req.body)
  const { username, password } = req.body;
 
   try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    client.release();

    if (result.rows.length === 0) {
      // Si el usuario no existe o las credenciales son incorrectas, responde con un error 401
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const user = result.rows[0];

    // Si las credenciales son correctas, genera un token y responde con él
    const token = jwt.sign({ username: user.usuario, id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ token });
  } catch (error) {
    console.error('Error al realizar la consulta a la base de datos', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/userToken', verifyToken ,(req,res) =>{

  res.send(req.user)

})


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

app.get('/obtenertemperatura', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM temperatura');
    client.release();
    res.json(result.rows);
  } catch (err) {
    console.error('Error al realizar la consulta a la base de datos', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT2, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT2}`);
});
