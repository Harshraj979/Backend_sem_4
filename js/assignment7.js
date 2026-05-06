const express=require('express');
const session=require('express-session');
const fs=require('fs');
const app=express();

app.use(session({
    secret:"mysecretKey",
    resave:false,
    saveUninitialized:false
}));

const writeStream=fs.createWriteStream('abc.txt',{encoding:'utf-8'});

app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    let text="";
    if(req.session.msg)
    {
        text=req.session.msg;
    }
    res.send(
        `
        <h2>Write Something</h2>
        <form method='POST'>
            <textarea name='msg'></textarea><br><br>
            <button>Submit</button>
        </form>
        <p>${text}</p>
        `
    )
})
app.post('/',(req,res)=>{
    const msg=req.body.msg;
    req.session.msg=msg;
    writeStream.write(msg+'\n');
    res.redirect('/');
})

app.listen(3000,()=>{});