var express = require('express')
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const path = require('path')
/* server config */
const publicDirectory = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;
app.use(express.static(publicDirectory))

//routers 
app.get('/', function (req, res) {
    res.sendFile(publicDirectory + '/index.html');
});

io.on('connection', function (socket) {
    console.log('new connection')
    //socket for just the current user
    socket.emit('message_Server_Client', 'Welcome to the chat Room')
    socket.broadcast.emit('message_Server_Client', 'New user has entered the room')

    socket.on('message_Client_Server', (msg) => {
        io.emit('message_Server_Client', msg)
    })
    socket.on('disconnect', () => {
        io.emit('serverMsg', 'a user has left the room')
    })
});

http.listen(port, function () {
    console.log(`server up on ${port}`);
});