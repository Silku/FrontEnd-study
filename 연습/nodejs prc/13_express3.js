const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res) => {
  const userid = req.body.userid;
  const userpw = req.body.userpw;
  console.log(`userid:${userid}, userpw:${userpw}`);
  // console.log('노드몬 실행테스트');
  res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
  res.write('<h2>POST 방식 테스트</h2>');
  res.write(`<p>userid : ${userid}</p>`);
  res.write(`<p>userpw : ${userpw}</p>`);
  res.end();
});

app.listen(port, () => {
  console.log(`${port}포트로 서버 실행 중입니다..`);
});
