const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

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
  
  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
  