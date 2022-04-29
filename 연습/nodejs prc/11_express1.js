const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('express 서버 테스트');
  //send() = body를 보냄
});

app.listen(port, () => {
  console.log(`${port}포트로 서버 실행 중..`);
});
