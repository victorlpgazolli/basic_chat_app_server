// var express = require('express'),
//     app = express(),
//     server = require('http').createServer(app),
//     io = require('socket.io').listen(server);



// io.on('connection', function (socket) {
//     console.log('a user connected');
//     socket.on("chat message", msg => {
//         console.log(msg);
//         io.emit("chat message", msg);
//       });
// });

// server.listen(8080, () => {
//     console.log('listening on '+ 8080);
// });

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on("chat message", msg => {
             console.log(msg);
             io.emit("chat message", msg);
           });
  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);