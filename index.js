var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);



io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on("chat message", msg => {
        console.log(msg);
        io.emit("chat message", msg);
      });
});

server.listen(8080, () => {
    console.log('listening on '+ 8080);
});