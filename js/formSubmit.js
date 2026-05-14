const express=require('express');
const fs=require('fs');
const zlib=require('zlib');
let app=express();

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/html/contact.html');
})

app.post('/submit',(req,res)=>{
  const {name,email}=req.body;
  const newData={name,email};
  fs.readFile('./json/form.json','utf-8',(err,data)=>{
    let users=[];
    if(!err){
      users=JSON.parse(data);
    }
    users.push(newData);
    fs.writeFile('./json/form.json',JSON.stringify(users,null,2),(err)=>{
      if(err){
        return res.send('Error while saving data');
      }
      //now compressing the form file as zlib in nother file
      const gzip=zlib.createGzip();
      const readStream=fs.createReadStream('./json/form.json');
      const writeStream=fs.createWriteStream('./txt_file/form.json.gz');
      readStream.pipe(gzip).pipe(writeStream);
      console.log('File compressed successfully');

      res.send(`
      <h2>Form Submitted Successfully</h2>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <a href="/">Go Back</a>
        `
      )
    })
  })
})

app.listen(8000,()=>{
  console.log("Server started at port 8000");
})