const http = require('http');
const fs = require('fs');

http
  .createServer((req, res) => {
    fs.readFile('html.html', (err, data) => {
      if (err) {
        console.log('에러발생!');
      } else {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.end(data);
      }
    });
  })
  .listen(3000, () => {
    console.log('3000포트 실행..');
  });
