const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const ejs = require('ejs');

const app = express();
const port = 3000;
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);

router.route('/login').post((req, res) => {
  const userinfo = { userid: 'client', userpw: 'qwer' };
  fs.readFile('./ejs2.ejs', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(ejs.render(data, userinfo));
    }
  });
});

app.all('*', (req, res) => {
  res.status(404).send('<h2>페이지를 찾을 수 없습니다!</h2>');
});

app.listen(port, () => {
  console.log(`${port}포트로 서버 실행 중입니다..`);
});
