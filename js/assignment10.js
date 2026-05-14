const express=require('express');
const zlib=require('zlib');
const fs=require('fs');
let app=express();
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send(
        `
        <h1>Manipulator</ah1>
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
    zlib.gzip(reversed,(err,compressed)=>{
        if(err)
        {
            res.send('Error while compressing the data');
            return;
        }
        fs.appendFile('data.gz',compressed,(err)=>{
            if(err)
            {
                res.send("Error");
                return;
            }
            res.send(`
                <h2>Compressed and appended to data.gz</h2>
                <p>${reversed}</p>
                <a href="/">Go Back</a>
            `)
        })
    })
})
app.listen(3000,()=>{});