const http=require('http');
const fs=require('fs');
const path=require('path');

const myServer=http.createServer((req,res)=>{
    let filePath='';

    if(req.url==='/' || req.url==='/home.html'){
        filePath='html/home.html';
    }
    else if(req.url==='/about.html'){
        filePath='html/about.html'
    }
    else if(req.url==='/contact.html'){
        filePath='html/contact.html'
    }
    else{
        res.writeHead(404, { "content-type": "text/html" });
        return res.end('<h2>404 - Page Not Found</h2>');
    }

    fs.readFile(filePath,'utf-8',(err,data)=>{
        if(err){
            res.writeHead(404,{"content-type":"text/html"});
            res.end(`<h1>Page not found</h1>`);
        }
        else{
            res.writeHead(200, { "content-type": "text/html" });
            res.end(data);
        }
    })
})

myServer.listen(8000,()=>{
    console.log("server started at port 8000");
})