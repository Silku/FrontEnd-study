const nodemailer = require('nodemailer');

const transPorter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'b99348799@gmail.com',
    pass: 'kim66496!!',
  },
  host: 'smtp',
  port: '465',
});

const mailOption = {
  from: '김태우<b99348799@gmail.com>',
  to: '김태우<kokicola@naver.com>',
  subject: 'node.js로 메일보내기 테스트',
  html: "<h2>node.js로 보내는메일 테스트</h2><p style='font-size : 15px; color: deeppink;'>테스트 메세지!!</p>",
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
