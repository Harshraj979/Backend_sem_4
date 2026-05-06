const express = require("express");
const fs = require("fs");

const app = express();

app.use((req, res, next) => {
    if (req.url === "/favicon.ico") return res.end();

    const log = `${Date.now()}: ${req.url} New request received\n`;
    fs.appendFile("log.txt", log, (err) => {
        if (err) console.log("Error writing log");
    });
    next(); 
});

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/about", (req, res) => {
    const userName = req.query.myname;
    res.send(`Hi ${userName}`);
});

app.use((req, res) => {
    res.status(404).send("404 Not Found");
});

app.listen(8000, () => {
    console.log("Server started on port 8000");
});
