var app = require('express')();
var http = require('http').Server(app);

const io = require('socket.io')(http,{
    path: 'router',
    serveClient: false,
});

// app.get('/router', function (req, res) {
//     io.on('connection', socket => {
//         console.log('a user connected');
//         socket.on('disconnect', () => {
//             console.log('user disconnected');
//         });
//         socket.on('chat message', msg => {
//             console.log('message: ' + msg);
//             io.emit('chat message', msg);
//         });
//     });
// });

// if (http.url == '/router') {
    io.of('/router').on('connection', socket => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
        socket.on('chat message', msg => {
            console.log('message: ' + msg);
            io.emit('chat message', msg);
        });
    });
// }


http.listen(4444, function () {
    console.log('listening on *:3333');
});