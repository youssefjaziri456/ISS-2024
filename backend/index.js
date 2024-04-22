const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});
const { ChatSocketHelper } = require("./sockets/chatSocket");

app.use(express.json());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

ChatSocketHelper.onConnection(io, app);
io.on('disconnect', (socket) => {
  console.log('a user disconnected');
});

server.listen(8080, () => {
  console.log('listening on *:8080');
});