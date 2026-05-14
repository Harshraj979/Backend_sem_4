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