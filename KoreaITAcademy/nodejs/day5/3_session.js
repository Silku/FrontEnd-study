const express = require('express');
const bodyparser = require('body-parser');
// npm i express-session
const expressSession = require('express-session');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({ extended: false }));
//서버에 저장할 세션 옵션션생성
app.use(
  expressSession({
    secret: '!@#$%^&*()',
    resave: false,
    saveUninitialized: true,
  })
);

//로그인페이지 호출이 되었을때
app.get('/login', (req, res) => {
  fs.readFile('login.html', 'utf8', (err, data) => {
    if (!err) {
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(data);
    } else {
      console.log(err);
    }
  });
});

//로그인 된 상태 정보들 포스트 불러오고,
//비교(아이디 패스가 참인지  그리고 main페이지로 이동)
app.post('/loginOk', (req, res) => {
  const userid = req.body.userid;
  const userpw = req.body.userpw;
  console.log(userid);
  console.log(userpw);

  // admin / 1234 조건으로 비교
  if (userid == 'admin' && userpw == '1234') {
    req.session.member = {
      id: userid,
      userpw: userpw,
      isauth: true,
    };
    res.redirect('/main');
  } else {
    res.redirect('/fail');
  }
});

//참일때 메인으로 이동되었을때
app.get('/main', (req, res) => {
  if (req.session.member) {
    console.log(req.session.member);
    fs.readFile('main.html', 'utf8', (err, data) => {
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(data);
    });
  } else {
    res.redirect('/login');
  }
});

app.get('/fail', (req, res) => {
  fs.readFile('fail.html', 'utf8', (err, data) => {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(data);
  });
});

//메인으로 이동했다가 로그아웃했을때
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    console.log('세션이 삭제되었습니다');
  });
  res.redirect('/login');
});

app.listen(port, () => {
  console.log(`${port}포트로 서버 실행중...`);
});
