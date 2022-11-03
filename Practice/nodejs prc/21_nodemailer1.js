const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
router.route('/sendmail').get((req, res) => {
  fs.readFile('sendmail.html', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(data);
    }
  });
});
router.route('/sendmail').post((req, res) => {
  const userId = req.body.userId;
  const userEmail = req.body.sendEmail;
  const touserId = req.body.touserId;
  const touserEmail = req.body.touserEmail;
  const title = req.body.title;
  const content = req.body.content;

  const fmtfrom = `${userId}<${userEmail}>`;
  const fmtto = `${touserId}<${touserEmail}>`;
  const transPorter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'b99348799@gmail.com',
      pass: '1234',
    },
    host: 'smtp.mail.com',
    port: '465',
  });
  const mailOption = {
    from: fmtfrom,
    to: fmtto,
    subject: title,
    text: content,
  };
  transPorter.sendMail(mailOption, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(`<h2>메일을 성공적으로 발송했습니다.♥</h2>`);
      console.log(info);
    }
    transPorter.close();
  });
});

app.use('/', router);

app.all('*', (req, res) => {
  res.status(404).send(`<h2>페이지를 찾을 수 없습니다.</h2>`);
});

app.listen(port, () => {
  console.log(`${port}port로 실행 중..`);
});
