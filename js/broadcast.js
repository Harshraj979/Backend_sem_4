const express=require('express');
const http=require('http');
const socketio=require('socket.io');
const path=require('path');

const app=express();
const server=http.createServer(app);
const io=socketio(server);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'..', 'html' , 'broadcast.html'))
})

let clients=0;
io.on('connection',(socket)=>{
    clients++;
    socket.emit('newbroadcast','Welcome new Clients');
    socket.broadcast.emit('newbroadcast',`${clients} client connected`);
    socket.on('disconnect',()=>{
        clients--;
        socket.broadcast.emit('newbroadcast',`${clients} clients connected`);
    })
})

server.listen(3000);