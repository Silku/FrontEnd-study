const http = require('http');
const fs = require('fs');

http
  .createServer((req, res) => {
    fs.readFile('only.mp3', (err, data) => {
      // fs.readFile('heart.png', (err, data) => {
      if (err) {
        console.log('에러발생!');
      } else {
        res.writeHead(200, { 'content-type': 'audio/mp3' });
        // res.writeHead(200, { 'content-type': 'image/png' });
        res.end(data);
      }
    });
  })
  .listen(3000, () => {
    console.log('3000포트 실행..');
  });
