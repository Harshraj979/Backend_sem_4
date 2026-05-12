//design a form  with text boxes for first and last names and buttons laeblled as set cookie and delete cookie. allow users to manage the cookie

const express=require('express');
const cookieparser=require("cookie-parser");
const app=express();
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());

app.get("/",(req,res)=>{
    res.send(`
        <form method="POST" action="/setcookie">
            <input type="text" name="firstname" placeholder="Enter first name"><br><br>
            <input type="text" name="lastname" placeholder="Enter lastt name"><br><br>
            <button type="submit"> Set Cookie</button>
        </form>
        <form method="POST" action="/deletecookie">
            <button type="submit">Delete Cookie</button>
        </form>
    `)
})
app.post("/setcookie",(req,res)=>{
    let fname=req.body.firstname;
    let lname=req.body.lastname;

    res.cookie("firstname",fname);
    res.cookie("lastname",lname);

    res.send("Cookie set successfully")
})
app.post("/deletecookie",(req,res)=>{
    res.clearCookie("firstname");
    res.clearCookie("lastname");
    res.send("cookie cleared successfully");
})
app.listen(3000);


//create a socket.io program to send "WOW server" from client to the server every 3 second stopping after 12 seconds and resuming again after 6 seconds

const socketio=require('socket.io');
const http=require('http');
const path=require('path');
const server=http.createServer(app);
const io=socketio(server);
const helmet=require("helmet");

app.get("/", (req, res) => {
    res.send(`
        <script src="/socket.io/socket.io.js"></script>
        <script>
            const socket = io();
            socket.on("message", (data) => {
                console.log(data);
            });
        </script>
    `);
});

io.on("connection",function(socket){
    console.log("client connected");
    let interval=setInterval(()=>{
        socket.emit("message","wow server");
    },3000);

    setTimeout(()=>{
        clearInterval(interval);
        console.log("stopped");

        setTimeout(()=>{
            interval=setInterval(()=>{
                socket.emit("message","Wow server");
            },3000);
        },6000);
    },12000)
})

server.listen(4000);
