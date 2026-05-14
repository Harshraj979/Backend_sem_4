//develop an event based notification system where custom event is emitted whenever a new user is registered use EventEmiiter class to trigger and handle events that logs user registration details on console
const eventEmitter=require('events');

function createNotification(){
    const notification=new eventEmitter();
    notification.on("userRegistered",(user)=>{
        console.log("New user registered");
        console.log("user: ",user.name);
        console.log("Email: ",user.email);
    })
    return notification;
}
const notification=createNotification();
notification.emit("userRegistered",{name:"John Doe",email:"john.doe@example.com"});
notification.emit("userRegistered",{name:"Jane Smith",email:"janesmith@abc.com"});

//create a basic websit using express that displays a registration form using get req and processes the submitted form data usibng post request.use body parser to extract usr input;

const express=require('express');
const bodyparser=require('body-parser');
const app=express();
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send(`
        <form method="POST" action="/register">
            <input type="text" name="name" placeholder="Enter Your name"><br><br>
            <input type="email" name="email" placeholder="Enter Your email"><br><br>
            <button type="submit">Submit</button>
        </form>
    `)
})
app.post("/register",(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    res.send(`
        <h2>Registration Successful</h2>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
    `);
})
app.listen(3000);