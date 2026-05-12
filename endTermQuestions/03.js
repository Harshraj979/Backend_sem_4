//build a node js program to create server and utilize modules to append contents in existing  files based on urls and show error msg for non existing urls

//using http server
const http=require('http');
const fs=require('fs');
const server=http.createServer((req,res)=>{
    if(req.url=="/home"){
        res.writeHead(200,{"content-type":"text/html"});
        res.write(`
            <htmL>
                <head>
                <form method="POST" action="/append">
                    <input type="text" name="name" placeholder="Enter something"><br><br>
                    <button type="submit">Append data</button>
                </form>
                </head>
            </html>
            `
        );
        res.end();
    }
    else if(req.url=="/append" && req.method==="POST"){
        let data="";
        req.on("data",chunk=>{
            data+=chunk.toString();
        })
        req.on("end",()=>{
            fs.appendFile("demo.txt",data+"\n",(err)=>{
                if(err){
                    res.end("Error while writting in file");
                }
                else{
                    res.end("Data appended successfully");
                }
            })
        })
    }
    
    else{
        res.end("Page not found");
    }
})
server.listen(4000);

//using express

const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.get('/home', (req, res) => {

    res.send(`
        <html>
        <body>

            <form method="POST" action="/append">

                <input type="text" name="name" placeholder="Enter something">
                <br><br>

                <button type="submit">Append Data</button>

            </form>

        </body>
        </html>
    `);

});

app.post('/append', (req, res) => {

    let data = req.body.name;

    fs.appendFile("demo.txt", data + "\n", (err) => {

        if (err) {
            res.send("Error while writing in file");
        }
        else {
            res.send("Data appended successfully");
        }

    });

});

app.use((req, res) => {
    res.send("404 Page Not Found");
});

app.listen(4000, () => {
    console.log("Server running on port 4000");
});