var app = require('express')();
var http = require('http').Server(app);

const io = require('socket.io')(http);

// app.get('/', function (req, res) {
//     // res.sendFile(__dirname +　'/index.html');

// });

io.on('connection', socket => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', msg => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

http.listen(3333, function () {
    console.log('listening on *:3333');
});