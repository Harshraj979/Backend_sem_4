const express=require('express');
const fs=require('fs');
const eventEmitter=require('events');

let app=express();
const emitter=new eventEmitter();

app.use(express.urlencoded({extended:false}));

const writeStream=fs.createWriteStream('./txt_file/live.txt',{encoding:'utf-8'});

emitter.on('writeFile',(data)=>{
    writeStream.write(data+"\n");
})

app.get('/',(req,res)=>{
    res.send(
        `
        <h2>Real-time file writter</h2>
        <form method='POST' action='/submit'>
            <input type='text' name='text' required>
            <br><br><button>Submit</button>
        </form>
        `
    );
});

app.post('/submit',(req,res)=>{
    emitter.emit("writeFile",req.body.text);
    res.send('Text written to file');
});

app.listen(3000,()=>{})
