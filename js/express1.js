const express=require('express');
let app=express();

app.get('/',(req,res)=>{
    res.send('Home Page');
});

app.get('/about',(req,res)=>{
    const userName=req.query.myname;
    res.send(`Hi ${userName}`);
});
app.get('/contact',(req,res)=>{
    res.send(
        `
        <h2>Contact Us</h2>
        <input type="text" placeholder="Enter your name"/>
        <br><br>
        <input type="email" placeholder="Enter your email"/>
        <br><br>
        <textarea placeholder="Enter your message"></textarea>
        <br><br>
        <button>Submit</button>
        `
    );
});
app.use((req,res)=>{
    res.status(404).send('404 Not Found');
});

app.listen(8000,()=>{
    console.log('Server started on port 8000');
});