const express = require('express');
const bodyParser = require('body-parser');
const static = require('serve-static');
const multer = require('multer');
const path = require('path');
const logger = require('morgan');
const nodemailer = require('nodemailer');
const fs = require('fs');
const { text } = require('express');

const port = 3000;
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));
app.use(logger('dev'));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extension);
    callback(null, basename + '_' + Date.now() + extension);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    files: 1,
    fileSize: 1024 * 1024 * 100,
  },
});

router.route('/mail').post(upload.array('photo', 3), (req, res) => {
  try {
    //파일 읽어오기
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
    //메일 작성
    fs.readFile('uploads' + filename, (err, data) => {
      const mailOptions = {
        from: fmtfrom,
        to: fmtto,
        subject: title,
        text: content,
        attachments: [{ filename: filename, content: data }],
      };
    });
  } catch (e) {
    console.log(e);
  }
});

app.use('/', router);

app.listen(port, () => {
  console.log(`${port}포트로 서버 실행중...`);
});
