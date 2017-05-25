const http = require('http');
const host = '127.1.0.0';
const port = '3000';

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end('<h1>Hello World!</h1>');
}).listen(port, host, () => {
    console.log('server is running on port 3000');
});