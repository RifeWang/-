var app = require('express')();
var http = require('http').Server(app);

// ---------------------------------------------------------
const io = require('socket.io')(http,{
    path: '/',  //不同的 path 对应不同的 websocket 连接
    serveClient: false, //whether to serve the client files
});

io.of('/router1').on('connection', socket => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', msg => {
        console.log('message: ' + msg);
        socket.volatile.emit('chat message', msg);  // volatile 方法发送易失性数据（如弱网络环境和长轮询）
    }); // volatile 易失性数据表示可以不保证用户收到服务器发送的数据
});

// ---------------------------------------------------------

io.of('/router2').on('connection', socket => {
    console.log('io2 user connected');
    socket.on('disconnect', () => {
        console.log('io2 user disconnected');
    });
    socket.on('chat message2', msg => {
        console.log('message2: ' + msg);
        socket.emit('chat message2', msg);  //此处与 demo2 不同
    });
});

http.listen(4444, function () {
    console.log('listening on *:4444');
});