const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        const logMessage = `Request received on ${new Date().toLocaleString()}\n`;
        fs.appendFile('log.txt', logMessage, (err) => {
            if (err) {
                console.log("Error writing to log file");
            } 
            else {
                console.log("Log saved successfully");
            }
        });
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("Welcome to Home Page");

    } 
    else if (req.url === '/about' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("This is About Page");
    } 
    else if (req.url === '/contact' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("This is Contact Page");
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end("404 Page Not Found");
    }
});

server.listen(8000, () => {
    console.log("Server started");
});