const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

app.use(cookieParser());

app.get('/setCookie', (req, res) => {
  console.log('setCookie 호출');
  res.cookie(
    'member',
    {
      id: 'banana',
      name: '바나나',
      gender: '여자',
    },
    {
      maxAge: 1000 * 60 * 3,
    }
  );
  res.redirect('/showCookie');
});

app.get('/showCookie', (req, res) => {
  console.log('showCookie 호출');
  res.send(req.cookies);
  res.end();
});

app.listen(port, () => {
  console.log(`${port}포트로 서버 실행중...`);
});
