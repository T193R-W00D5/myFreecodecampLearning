import http from 'http';
import fs from 'fs';
import path from 'path';

// Simple Node.js server for serving static files and handling routes
const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') filePath = './pages/_Home.html';

    const extname = path.extname(filePath);

    let contentType;

    switch (extname) {
    case '.css':
        contentType = 'text/css; charset=utf-8';
        break;
    case '.js':
        contentType = 'text/javascript; charset=utf-8';
        break;
    case '.ico':
        contentType = 'image/x-icon';
        break;
    case 'avif':
        contentType = 'image/avif';
        break;
    case '.webp':
        contentType = 'image/webp';
        break;
    case '.png':
        contentType = 'image/png';
        break;
    case '.jpg':
    case '.jpeg':
        contentType = 'image/jpeg';
        break;
    case '.svg':
        contentType = 'image/svg+xml';
        break;
    default:
        contentType = 'text/html; charset=utf-8';
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end("Page not found");
        } else {
            res.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': Buffer.byteLength(content)
            });

            res.end(content);
        }
    });
});

server.listen(3010, () => {
    console.log("Server running at http://localhost:3010");
});