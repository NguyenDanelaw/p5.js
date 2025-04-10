const http = require('http');
const fs = require('fs');
const path = require('path');

const basePath = __dirname;

const server = http.createServer((req, res) => {
    let reqPath = decodeURIComponent(req.url);
    if (reqPath === '/') reqPath = '/index';

    let filePath = path.join(basePath, reqPath + '.html');

    // Fallback: try folder/index.html if .html doesn't exist
    if (!fs.existsSync(filePath)) {
        filePath = path.join(basePath, reqPath, 'index.html');
    }

    console.log('Trying to load:', filePath);

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`<h1>404 - ${req.url} not found</h1>`);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        }
    });
});

server.listen(3000, () => {
    console.log('🚀 Server running at http://localhost:3000');
});
