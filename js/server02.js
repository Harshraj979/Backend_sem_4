//using server.io send a message "Hello client" from server to client after every 2 seconds. at the 10th second ,the server stops sending message to the client.the messages must print on browser page

const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const helmet=require('helmet');

const app = express();
app.use(helmet());
const server = http.createServer(app);
const io = socketio(server);

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'html', 'client1.html'));
});

io.on("connection", function (socket) {
    console.log("Client is connected");
    let count = 0;
    let interval = setInterval(function(){
        if(count<5) 
        {
            socket.emit("message", "Hello client");
            count++;
        } 
        else 
        {
            clearInterval(interval);
        }
    }, 2000);

    socket.on("disconnect", function () {
        console.log("Client is disconnected");
    });
});

server.listen(2000, () => {
    console.log("Server running on port 2000");
});
