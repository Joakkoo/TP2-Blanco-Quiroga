const express = require('express');
const http = require('http');
const { Pool } = require('pg');
const { Server } = require('socket.io');
require('dotenv').config();
const axios = require('axios');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
// Iniciar el servidor
const PORT = process.env.PORT;

// Configurar una ruta básica
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


// Escuchar conexiones de Socket.io
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  // Escuchar el evento 'temperatura' del cliente
  socket.on('temperatura',async (data) => {
    console.log('Mensaje recibido del cliente:', data);
    // Responder al cliente
    socket.emit('respuesta', { data: 'Mensaje recibido' });
    try {
      const response = await axios.post('http://localhost:4003/webhook', data);
      console.log('Respuesta del webhook:', response.data);
    } catch (error) {
      console.error('Error al enviar la temperatura al webhook:', error);
    }

  });

  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
  