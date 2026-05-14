const express=require('express');
const http=require('http');
const socketio=require('socket.io');
const app=express();
const server=http.createServer(app);
const io=socketio(server);
/*
app.get("/",(req,res)=>{
    res.send(`
    <script src="/socket.io/socket.io.js"></script>
        <script>
            const socket = io();
            socket.on("newBroadcast", (data) => {
                console.log(data);
            });
        </script>
    `)
})
let client=0;
io.on('connection',(socket)=>{
    client++;
    socket.emit("newBroadcast","welcome new clients");
    socket.broadcast.emit("newBroadcast",`${client} clients connected`);
    socket.on('disconnect',()=>{
        client--;
        socket.broadcast.emit("newBroadcast",`${client} clients connected`);
    })
})
server.listen(3000);
*/
/*
app.get("/",(req,res)=>{
    res.send(
    `
    <script src="/socket.io/socket.io.js"></script>
    <input type="text" id="msg" placeholder="Enter a message">
    <button onclick="sendmsg()">Send Message</button>
    <ul id="messages"></ul>
    <script>
        let socket=io();
        function sendmsg(){
            let element=document.getElementById("msg");
            let msgs=element.value;
            socket.emit("chat",msgs);
            element.value="";
        }
        socket.on("chat",(msg)=>{
            let li=document.createElement("li");
            li.innerText=msg;
            document.getElementById("messages").appendChild(li);
        })
    </script>
    `)
})
io.on("connection",(socket)=>{
    socket.on("chat",(msgs)=>{
        io.emit("chat",msgs);
    })
})
server.listen(3000);
*/
/*
app.get("/",(req,res)=>{
    res.send(`
        <script src="socket.io/socket.io.js"></script>
        <script>
            const socket=io();
            socket.on("message",(data)=>{
                document.write("Recieved message"+data+"<br>")
            })
        </script>
    `)
})
io.on("connection",(socket)=>{
    const interval=setInterval(()=>{
        socket.emit("message","Hello client");
    },2000);
    setTimeout(()=>{
        clearInterval(interval);
    },11000);
})
server.listen(3000);
*/
