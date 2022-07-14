const nodemailer = require('nodemailer');
//npm i nodemailer

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'gomaci75@gmail.com',
    pass: '비번',
  },
  host: 'smtp.mail.com',
  port: '465',
});

const mailOptions = {
  fromm: '김순조<gomaci75@gmail.com>',
  to: '김순조<gomaci@naver.com>',
  subject: 'node.js의 nodemailer 테스트중입니다',
  html: "<h2>안녕하세요. 메일이 잘 가나요?</h2><p style='color: deeppink'>정말 잘 가네요~~</p>",
};

transporter.sendMail(mailOptions, (err, info) => {
  transporter.close();
  if (err) {
    console.log(err);
  } else {
    console.log(info);
  }
});

// nodemailer 설정

// const nodemailer객체명 = nodemailer.createTransport({
//     service: 'Gmail',
//     auth:{
//         user: 'gmail 계정',
//         pass: '비밀번호'
//     },
//     host: 'smtp.mail.com',
//     port: '465'
// });

// 메일 발송 옵션 설정

// const 메일발송옵션객체명 = {
//     from: "이름<메일주소>",
//     to: "이름<메일주소>",
//     subject: "제목",
//     text: "내용"
//     (html: "HTML코드")
// }
