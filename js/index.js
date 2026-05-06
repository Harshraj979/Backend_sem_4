const http = require("http");
const fs = require("fs");
const url = require("url");
const { placeOrder } = require("./emitterProduct");

const myServer = http.createServer((req, res) => {
    //callback function for incoming request
    if (req.url === '/favicon.ico') return res.end();
    const log = `${Date.now()}: ${req.url} New request recieved\n`;
    const myUrl = url.parse(req.url, true);

    console.log(myUrl);
    fs.appendFile("log.txt", log, (err, data) => {
        switch (myUrl.pathname) {
            case '/':
                res.end("Home Page");
                break;
            case '/about':
                const userName = myUrl.query.myname;
                res.end(`Hi ${userName}`);
                break;
            case '/placeOrder':
                if (req.method === 'POST') {
                    let body = '';
                    req.on('data', chunk => {
                        body += chunk.toString();
                    });
                    req.on('end', () => {
                        try {
                            const { user, productId, qty } = JSON.parse(body);
                            placeOrder(user, productId, qty);
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ message: 'Order processed' }));
                        } catch (error) {
                            res.writeHead(400, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Invalid request body' }));
                        }
                    });
                } else {
                    res.writeHead(405, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Method not allowed' }));
                }
                break;
            default:
                res.end("404 not found");
        }
    });
});

myServer.listen(8000, () => {
    console.log('Server started');
});
