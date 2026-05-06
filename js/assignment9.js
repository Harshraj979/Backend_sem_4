const express=require('express');
const fs=require('fs');
let app=express();

app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.send(
        `
        <h2>Enter File Name</h2>
        <form method='POST' action='/submit'>
            <textarea name='msg'></textarea><br><br>
            <button>Check</button>
        </form>
        `
    )
});
app.post('/submit',(req,res)=>{
    const filename=req.body.msg;
    fs.readFile(filename,'utf-8',(err,data)=>{
        if(err)
        {
            console.log("Error");
        }
        else{
            res.send(
                `
                <h3>File Content:</h3>
                <pre>${data}</pre>
                <br><a href="/">Go Back</a>
            `
            )
        }
    })
})
app.listen(3000,()=>{});