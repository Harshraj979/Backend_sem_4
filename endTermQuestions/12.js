//You are building a survey app where a "feedback" event triggers a thank-you note. Use EventEmitter to listen for "surveySubmit" and use the fs module to append the student's name to a responses.txt file

const eventEmitter=require('events');
const express=require('express');
const fs=require('fs');

const app=express();
app.use(express.urlencoded({extended:true}));

const emitter=new eventEmitter();

emitter.on('feedback',(studentName)=>{
    console.log(`Thank You ${studentName}`);
})
emitter.on('surveySubmit',(studentName)=>{

    fs.appendFile("responses.txt",studentName+"\n",(err)=>{
        if(err){
            console.log("Error");
        }
        else{
            console.log("Response submitted");
        }
    })
})

app.get("/",(req,res)=>{
    res.send(`
        <form method="POST" action="/surveysubmit">
            <input type="text" name="name" placeholder="Enter your name">
            <button type="submit">Submit</button> 
        </form>
    `)
})

app.post("/surveysubmit",(req,res)=>{
    console.log(req.body);
    const studentName=req.body.name;
    emitter.emit("surveySubmit",studentName);
    emitter.emit("feedback",studentName);
    res.send("servey submitted");
})
app.listen(3000);


//compress and decompress file using zlib
// compress
const zlib=require('zlib');
const writeStream=fs.createWriteStream("input.txt");
const readStream=fs.createReadStream('input.txt.gz');

readStream.pipe(zlib.createGzip()).pipe(writeStream);
console.log("file compressed");

//decompress
const readStream1=fs.createWriteStream("input.txt.gz");
const writeStream1=fs.createReadStream("output.txt");

readStream1.pipe(zlib.createGunzip()).pipe(writeStream1);
console.log("file decompressed");
