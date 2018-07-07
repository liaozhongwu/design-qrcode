'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');

http.createServer((req, resp) => {
  let baseDir = __dirname;
  if (req.url.includes('dist')) {
    baseDir = path.join(__dirname, '..');
  }
  const file = path.join(baseDir, req.url);
  fs.access(file, (err) => {
    if (err) {
      resp.end('404 not found');
    } else {
      fs.createReadStream(file).pipe(resp);
    }
  });
}).listen(8010);