const http = require('http');
http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(
      "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>http 모듈테스트</title></head><body><h2>http 모듈테스트</h2><p>서버띄웠네 ㅋㅋ</p></body></html>"
    );
  })
  .listen(3000, () => {
    console.log('port 3000 서버 실행 중..');
  });
