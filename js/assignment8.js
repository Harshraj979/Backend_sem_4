const express=require('express');
let app=express();

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send(
        `
        <h1>Manipulator</h1>
        <form method='POST' action='/reverse'>
            <textarea name='msg'></textarea><br><br>
            <button>Submit</button>
        </form>
        `
    )
})
app.post('/reverse',(req,res)=>{
    const msg=req.body.msg;
    const reversed=msg.split('').reverse().join('');
    res.send(
        `
        <h1>Reversed</h1>
        ${reversed}
        `
    )
})
app.listen(3000,()=>{});