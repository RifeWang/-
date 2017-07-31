var app = require('express')();
var http = require('http').Server(app);

const io = require('socket.io')(http);

io.on('connection', socket => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg, fn) => {
        console.log('message: ' + msg);
        io.volatile.emit('chat message', msg); // volatile 易失性数据传输
        fn('woot'); //通过回掉函数客户端确认接收到数据，并可以将数据返回
    });
});

http.listen(3333, function () {
    console.log('listening on *:3333');
});