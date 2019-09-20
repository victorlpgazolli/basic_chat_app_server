process.env.NTBA_FIX_319 = 1;

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

var TelegramBot = require("node-telegram-bot-api");
var token = "843163756:AAEDLcPNVkJhYzwmIPIqZPYy1vs7pI7N5IY";
var bot = new TelegramBot(token, {polling:true});
var chatId;
bot.onText(/eae/,function(msg,match){
	chatId = msg.chat.id;
  bot.sendMessage(chatId,'Diz ae');
})
bot.onText(/\/url/,function(msg,match){
    chatId = msg.chat.id;
    io.emit("chat message", msg);
})
const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on("chat message", msg => {
    console.log(msg);
    io.emit("chat message", msg);
    bot.sendMessage(chatId,msg);
  });
  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);