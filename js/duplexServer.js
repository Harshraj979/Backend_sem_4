const net = require('net');

const server = net.createServer((socket) => {
    console.log('Client connected');
    socket.on('data', (data) => {
        console.log('Received:', data.toString());
        socket.write('Hello, client!');
    });
    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});

