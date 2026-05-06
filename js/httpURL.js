const http=require('http');
const fs=require('fs');
let server=http.createServer((req,res)=>{
    if(req.url=="/home"){
        res.writeHead(200,{"content-type":'text/html'});
        res.end("<h1 style=color:blue>Home Page</h1>");
    }
    else if(req.url=="/about"){
        res.writeHead(200,{"content-type":"text/html"});
        res.end("<h1 style=color:blue>About us Page</h1>");
    }
    else if(req.url=="/products"){
        fs.readFile('products.txt','utf-8',(err,data)=>{
            if(err){
                res.writeHead(404,{'content-type':'text/html'});
                res.end("<p style='color:red'>Error while fetching the data</p>")
            }
            else{
                res.writeHead(200,{"content-type":"text/html"});
                res.end(`<pre style='color:green ; font-size:30px';>${data}</pre>`);
            }
        })
    }
    else if(req.url=="/image"){
        fs.readFile('image.png',(err,data)=>{
            if(err){
                res.writeHead(404,{'content-type':'text/html'});
                res.end("<h1>Image not found</h1>");
            } 
            else{
                res.writeHead(200,{'content-type':'image/png'});
                res.end(data);
            }
        })
    }

    else{
        res.writeHead(404,{'content-type' : 'text/html'});
        res.end("<h1 style=color : blue>Error 404 : Page not found</h1>");
    }
})

server.listen(8000,()=>{
    console.log("Server started listening on port 8000");
})