const express = require('express');
const app = express();
const port = 3000;

app.use((req, res) => {
  //   res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
  //   res.end('<h2>익스프레스 서버에서 응답한 메세지입니다.</h2>');
  console.log('첫번째 미들웨어 실행');
  //   res.redirect('https://www.naver.com');
  console.dir(req.header);
  const userAgent = req.header('User-Agent');
  //User-Agent : 사용자 브라우저&OS 정보를 받는 기능
  console.log(userAgent);
  const userid = req.query.userid;
  console.log(userid);

  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  res.write('<h2>익스프레스 서버에서 응답한 메세지입니다!.</h2>');
  res.write(`<p>user-agent : ${userAgent}</p>`);
  res.write(`<p>userid : ${userid}</p>`);
  res.end();
});

app.listen(port, () => {
  console.log(`${port}포트로 서버 실행 중입니다..`);
});
