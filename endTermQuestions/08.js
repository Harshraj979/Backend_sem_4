//?create a node js application that streams a very large  file to the client using stream module the application must ensure efficient memory usage nd log the streaming progress on server
const express=require('express');
const fs=require('fs');
const app=express();
/*
app.get("/download",(req,res)=>{
    const file="largefile.mp4";
    const totalSize=fs.statSync(file).size;
    let sent=0;
    const stream=fs.createReadStream(file);
    stream.on('data',(chunk)=>{
        sent+=chunk.length;
        console.log(`Streaming progress: ${((sent/totalSize)*100).toFixed(2)}%`);
    });
    stream.on("end",()=>{
        console.log("Streaming completed");
    })
    stream.pipe(res);
})
app.listen(3000);
*/
//?implement a custom middleware that logs request method url and timestamp for incoming request..apply the middleware gloablly using app.use

app.use((req,res,next)=>{
    console.log("Method: ",req.method);
    console.log("URL: ",req.url);
    console.log("timestamp: ",new Date().toLocaleString());
    next();
})
app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/about", (req, res) => {
    res.send("About Page");
});
app.listen(3000);