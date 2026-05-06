const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const helmet=require('helmet');
const app = express();
app.use(helmet());
const server = http.createServer(app);
const io = socketio(server);

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'html', 'client0.html'));
});

io.on("connection", function(socket) {
    console.log("Client is connected");

    socket.emit("message", "Hello from server to the client");
    socket.on("clientMessage", function(data){
        console.log("Message from client:", data);
    });
    socket.on("disconnect", function() {
        console.log("Client is disconnected");
    });
});

server.listen(2000, function() {
    console.log("Server running on port 2000");
});

