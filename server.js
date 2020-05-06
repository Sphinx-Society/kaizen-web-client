const { createServer } = require('http');
const { extname } = require('path');
const { readFile } = require('fs');

const port = 8080;
const urlPrefix = './dist';

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.svg': 'image/svg+xml',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.json': 'application/json',
  '.gif': 'image/gif',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm',
};

function printErrorAndExit(error) {
  console.log(error);
  process.exit(1);
}

function getFile(req) {
  let file = `${urlPrefix}${req.url}`;
  if (file === './dist/') {
    file = './dist/index.html';
  }
  return file;
}

const server = createServer((req, res) => {
  const file = getFile(req);
  const ext = extname(file);
  console.log(ext);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  readFile(file, (error, content) => {
    if (error) {
      res.writeHead(500);
      res.end();
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, (error) => {
  if (error) {
    printErrorAndExit(error);
  }
  const url = `http://localhost:${port}`;
  console.log(`Server running at ${url}`);
});
