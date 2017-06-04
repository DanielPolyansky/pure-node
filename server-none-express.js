const http = require('http');
const host = '127.1.0.0';
const port = '3000';
const fs = require('fs'); //file system , not file stream
const path = require('path');
const mimes = {
    ".htm": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".gif": "image/gif",
    ".jpg": "image/jpg",
    ".png": "image/png"
}

qrImage
    .image('http://www.nodejs.org', { type: 'png', size: 20 }).pipe(fs.createWriteStream('MyQR.png'));
const server = http.createServer((req, res) => {
    const filepath = (req.url === '/') ? ('./index.html') : ('.' + req.url);
    const contentType = mimes[path.extname(filepath)];
    fs.exists(filepath, (file_exists) => {
        if (file_exists) {
            /*fs.readFile(filepath, (err, content) => {
                if (err) {
                    res.writeHead(500);
                    res.end();
                } else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content, 'utf-8');
                }
            });*/
            res.writeHead(200, { 'Content-Type': contentType });
            const streamFile = fs.createReadStream(filepath).pipe(res);
            streamFile.on('err', () => {
                writeHead(500);
                res.end();
            })
        } else {
            res.writeHead(404);
            res.end('sorry! file not found');
        }
    });
}).listen(port, host, () => {
    console.log('server is running on port 3000');
});