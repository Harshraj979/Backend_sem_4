const http=require('http');
const path=require('path');
const url=require('url');
const os=require('os');

// url functions
const myUrl = url.parse(
  'http://localhost:8000/profile?name=harsh&age=20',true
);

console.log(myUrl);
console.log(myUrl.pathname);
console.log(myUrl.host);
console.log(myUrl.query);
console.log(myUrl.query.age);
console.log(myUrl.query.name);
console.log(myUrl.protocol);

//file info
console.log(`Directory name: ${__dirname}`);
console.log(`File name: ${__filename}`);
console.log(`Extension: ${path.extname(__filename)}`);
console.log("Full object:", path.parse(__filename));

// os module
console.log("OS name: ",os.platform());
console.log("OS type: ",os.type());
console.log("cpu architecture:",os.arch());
console.log("Cpu size:",os.cpus().length);

//server
const myserver=http.createServer((req,res)=>{
    res.writeHead(200,{'content-type': 'text/plain'});
    res.end('Hello world! from harsh\nthis is my first node server');
});

myserver.listen(8000,()=>{
    console.log("Server started");
})
