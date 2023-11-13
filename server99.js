const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('stream', (image) => {
    socket.broadcast.emit('stream', image);
  });
});

server.listen(5555, () => {
  console.log('Server is running on port 5555');
});
