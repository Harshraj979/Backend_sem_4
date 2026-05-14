//Write an Express route that uses a Mongoose model to find alll documents where "status" is "active" and returns them as JSON

const express=require('express');
const mongoose=require('mongoose');
const app=express();
/*
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/userDB")
    .then(()=>console.log("Database connected"))
    .catch(()=>console.log("Error"));

const userSchema = new mongoose.Schema({
    name: String,
    status: String
});

const User = mongoose.model("User", userSchema);
app.get("/activeuser",async(req,res)=>{
    try{
        const activeUsers=await User.find({
            status:"active"
        })
        res.json(activeUsers);
    }
    catch(err){
        res.json(err);
    }
})
app.listen(3000);
*/
// Build a chat interface using Socket Services where messages are sent and reveived in real-time. Use an Express middleware to maintain user sessions via express-session and store the chat history in MongoDB documents

const session=require('express-session');
const http=require('http');
const socketio=require('socket.io');
const server=http.createServer(app);
const io=socketio(server);

app.use(session({
    secret:"mysecretkey",
    resave:false,
    saveUninitialized:true,
}))

mongoose.connect("mongodb://127.0.0.1:27017/chatDB")
    .then(()=>console.log("Databse connected"))
    .catch(()=>console.log("Error"));

const chatSchema=new mongoose.Schema({
    username: String,
    message: String,
    time: {
        type: Date,
        default: Date.now
    }
})

const Chat= mongoose.model("Chat",chatSchema);

app.get("/",(req,res)=>{
    res.send(`
        <h1>Real time chat application</h1>
        <input type="text" id="msg" placeholder="Enter a message">
        <button onclick="sendMessage()">Send</button>
        <div id="chat"></div>

        <script src="/socket.io/socket.io.js"></script>
        <script>
            const socket =io();
            function sendMessage(){
                const msg =document.getElementById("msg").value;
                socket.emit("chatMessage", msg);
            }
            socket.on("message", (data) => {
                document.getElementById("chat").innerHTML+="<p>" + data + "</p>";
            });
        </script>
    `)
})
io.on("connection",(socket)=>{
    console.log("User connected");
    socket.on("chatMessage",async(msg)=>{
        const chat=new Chat({
            username:"User",
            message:msg
        })
        await chat.save();
        io.emit("message",msg);
    })
})

server.listen(3000);

//Your serverr logs are getting too large for memory. Write a script that uses createReadStream to read access.log and pipes it into zlib.createGzip() to save a compressed backup named access.log.gz
const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream("access.log");
const writeStream = fs.createWriteStream("access.log.gz");

readStream.pipe(zlib.createGzip()).pipe(writeStream);
