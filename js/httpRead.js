const http=require('http');
const fs=require('fs');

let app=http.createServer((req,res)=>{
    if(req.url=="/"){
        res.writeHead(200,{"content-type":"text/html"});
        res.end(`<div>
                    <h2>Click  on the button to see the data</h2>
                    <a href='/fetchdata'>
                        <button>Fetch Data</button>
                    </a>
                </div>`
        )
    }
    else if(req.url=="/fetchdata"){
        fs.readFile("studentData.txt","utf-8",(err,data)=>{
            if(err){
                res.writeHead(404,{'content-type':'text/html'});
                res.end("<p style='color:red'>Error while fetching the data</p>")
            }
            else{
                res.writeHead(200,{"content-type":"text/html"});
                res.end(`<pre style='color:green ; font-size:30px';>${data}</pre>`);
            }
        });
    }
    else{
        res.writeHead(404,{"content-type":"text/html"});
        res.end(`<h2>Page not found</h2>`);
    }
})

app.listen(8000,()=>{
    console.log("server started on port 8000");
});