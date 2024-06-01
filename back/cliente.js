
const io = require('socket.io-client');
require('dotenv').config();
const PORT = process.env.PORT;

const socket = io(`http://localhost:${PORT}`);

function TemperaturaRandom() {
    setInterval(() => {
        const temperatura = Math.random() * (35 - 15) + 15; // Genera un número entre 15 y 35
        const res = Number(temperatura.toFixed(2));
        socket.emit('temperatura', { valor: res });
        console.log('Temperatura enviada:', res);
      }, 5000);
}

socket.on('connect', () =>{
    console.log('Conectado al servidor')
    TemperaturaRandom();
});


// Manejar la desconexión
socket.on('disconnect', () => {
    console.log('Desconectado del servidor Socket.IO');
  });
  

// Manejar eventos personalizados del servidor
socket.on('respuesta', (data) => {
    console.log('Respuesta del servidor:', data);
  });
  