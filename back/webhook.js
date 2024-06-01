const express = require('express');
const bodyParser = require('body-parser');
const { Socket } = require('socket.io');
const axios = require('axios');
require('dotenv').config();
const app = express();
const PORT3 = process.env.PORT3;

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());



// Ruta para recibir los datos del webhook
app.post('/webhook', (req, res) => {
  const data = req.body; // Aquí puedes acceder a los datos enviados al webhook
  console.log('Datos recibidos WebHook:', data);
  // Aquí puedes agregar la lógica para procesar los datos recibidos
  axios.post('http://localhost:4002/temperatura', data);
  res.status(200).send('Datos recibidos correctamente.');
});

// Iniciar el servidor
app.listen(PORT3, () => {
  console.log(`Servidor del webhook corriendo en http://localhost:${PORT3}`);
});
