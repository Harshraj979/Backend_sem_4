const http=require('http');
const fs=require('fs');
const express=require('express');
const app=express();

app.use(express.urlencoded({extended:false}));
app.get('/',(req,res)=>{
    res.send(
        `
        <html>
            <head>
                <body>
                    <form method='POST' action='submit'>
                        <textarea name='msg'></textarea><br><br>
                        <button>Submit</button>
                    </form>
                </body>
            </head>
        </html>
        `
    )
})
app.post('/submit',(req,res)=>{
    const body=req.body.msg;
    fs.appendFile('./txt_file/log.txt',body+'\n',(err)=>{
        if(err)
        {
            console.log(err);
        }
    });
    res.send('Saved successfully');
})

app.listen(3000,()=>{});
/*
const myServer=http.createServer((req,res)=>{
    if(req.method==='GET'){
        res.writeHead(200,{"content-type":'text/html'});
        res.end(
            `
                <h2>Write Something</h2>
                <form method='POST'>
                    <textarea name='msg'></textarea><br><br>
                    <button type='submit'>Save</button>
                </form>
            `
        )
    }
    if(req.method==='POST'){
        let body='';
        req.on("data",chunk=>{
            body+=chunk.toString();
        })
        req.on("end",()=>{
            const data=new URLSearchParams(body);
            const message=data.get('msg');

            fs.appendFileSync('./txt_file/log.txt',message+'\n');
            res.writeHead(200,{"content-type":"text/html"});
            res.end(
                `<h3>Saved successfully</h3>
                <a href="/">Go Back</a>`
            )
        })
    }
})

myServer.listen(8000,()=>{
    console.log("Server started at port 8000");
})
*/