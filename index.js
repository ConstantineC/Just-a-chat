const express = require('express');
const socket = require('socket.io');
const app = express();

app.use(express.static('public'))

app.get('/', function (req, res) {
    res.send('hello world')
  })

  
const server = app.listen(4000, function() {
    console.log('now listening for requests')
});

const io = socket(server);

io.on('connection', function(socket) {
    console.log('made socket connection', socket.id);

    socket.on('chat', function(data) {
        io.sockets.emit('chat', data)
    });

    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data)
    });
});