var app = require('express')();
var http = require('http').Server(app);

// ---------------------------------------------------------
const io = require('socket.io')(http,{
    path: '/router',  //不同的 path 对应不同的 websocket 连接
    serveClient: false, //whether to serve the client files
});

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

// ---------------------------------------------------------

const io2 = require('socket.io')(http,{
    path: '/router2',  //不同的 path 对应不同的 websocket 连接
    serveClient: false, //whether to serve the client files
});

io2.on('connection', socket => {
    console.log('io2 user connected');
    socket.on('disconnect', () => {
        console.log('io2 user disconnected');
    });
    socket.on('chat message2', msg => {
        console.log('message2: ' + msg);
        io2.emit('chat message2', msg);
    });
});

http.listen(4444, function () {
    console.log('listening on *:4444');
});