const express=require('express');
let app=express();
const path = require('path');
app.use(express.static(path.join(__dirname, '..')));
app.get('/testcss',(req,res)=>{
    res.send(
        `<html>
        <head>
            <link rel="stylesheet" type="text/css" href="/css/theme.css">
        </head>
        <body>
            <h1>Welcome to the CSS Test Page</h1>
            <p>This page is styled using CSS.</p>
        </body>
        </html>`
    );
});
app.listen(3000,()=>{});
