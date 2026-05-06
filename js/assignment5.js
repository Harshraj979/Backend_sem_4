const express=require('express');
const fs=require('fs');

let app=express();
const writeStream=fs.createWriteStream('./txt_file/server.log',{encoding:'utf-8'});

app.get('/',(req,res)=>{
    res.send(
        `
        <h2>Real time Log Viewer</h2>
        <form action='/generate' method='POST'>
        <button type='submit'>Generate Random Log</button>
        </form>
        `
    )
})
app.post('/generate',(req,res)=>{
    const time=new Date().toLocaleTimeString();
    const log=`Log @ ${time} - random: ${Math.floor(Math.random()*1000)}`;
    writeStream.write(log+'\n');
    res.send(`
        <p>${log}</p>
        <a href='/'>Go back</a>
    `)
})
app.listen(3000,()=>{});