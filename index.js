const express = require('express');
const app = express();
const server = require('http').createServer(express);
const io = require('socket.io').listen(server);
const port = process.env.SERVER_CHAT_APP_API_PORT || 8080;

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on("chat message", msg => {
        console.log(msg);
        io.emit("chat message", msg);
      });
});

server.listen(port, () => {
    console.log('listening on '+ port);
});