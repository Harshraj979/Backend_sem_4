//Build a To-Do app where tasks are stored in MongoDB. Use Socket.IO so that when one user adds a task, all other users’ screens update immediately without a page refresh.

const express=require('express');
const mongoose=require('mongoose');
const socketio=require('socket.io');
const http=require('http');
const app=express();
const server=http.createServer(app);
const io=socketio(server);


const taskSchema = new mongoose.Schema({
    task: String
});

const Task = mongoose.model("Task", taskSchema);

app.get("/",(req,res)=>{
    res.send(`
        <html>
            <input type="text" id="msg" placeholder="Enter a message">
            <button onclick="sendMsg()">Send</button>
            <div id="chat"></div>
            <script src="/socket.io/socket.io.js"></script>
            <script>
                const socket=io(); 
                function sendMsg(){
                    const msg=document.getElementById("msg").value;
                    socket.emit("chatMessage",msg);
                }
                socket.on("chatMessage",(data)=>{
                    document.getElementById("chat").innerHTML+="<p>"+data+"</p>";
                })
            </script>

        </html>
        `)
})
io.on('connection',(socket)=>{
    console.log("User connected");
    socket.on("chatMessage",async(msg)=>{
        const newTask=new Task({
            task: msg
        });
        await newTask.save();
        io.emit("chatMessage", msg);
    })
})

server.listen(3000);
