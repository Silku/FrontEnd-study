const express = require('express');
const bodyParser = require('body-parser');
//serve-static : 리소스들의 임의의 url을 정해주는 디렉토리 만들어주는 역할
const static = require('serve-static');
// npm i multer
const multer = require('multer');
const path = require('path');
// npm i morgan
//morgan : 로그를 남기는 모듈
const logger = require('morgan');

const port = 3000;
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));
app.use(logger('dev'));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    //에러 없는걸로 가정
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    //ex) 파일명 : apple.jpg
    const extension = path.extname(file.originalname); //.jpg
    const basename = path.basename(file.originalname, extension); //apple
    callback(null, basename + '_' + Date.now() + extension); //
  },
});

const upload = multer({
  storage: storage,
  limits: {
    files: 1,
    fileSize: 1024 * 1024 * 100,
  },
});

router.route('/wirte').post(upload.array('photo', 1), (req, res) => {
  try {
    const files = req.files;
    console.dir(req.files[0]);
  } catch (e) {
    console.log(e);
  }
});

app.use('/', router);

app.listen(port, () => {
  console.log(`${port}포트로 서버 실행중...`);
});
