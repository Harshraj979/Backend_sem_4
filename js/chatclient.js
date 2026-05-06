const express=require('express');
const http=require('http');
const socketio=require('socket.io');
const path=require('path');

const app=express();
const server=http.createServer(app);
const io=socketio(server);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','html','chatclient.html'));
})

io.on('connection',(socket)=>{
    socket.on('chat',(msg)=>{
        io.emit('chat',msg);
    })
})
server.listen(3000);