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

router.route('/write').post(upload.array('photo', 1), (req, res) => {
  try {
    const files = req.files;
    console.dir(req.files[0]);
    let originalname = '';
    let filename = '';
    let mimetype = '';
    let size = 0;
    if (Array.isArray(files)) {
      console.log(`클라이언트에서 받아온 파일개수 : ${files.length}`);
      for (let i = 0; i < files.length; i++) {
        originalname = files[i].originalname;
        filename = files[i].filename;
        mimetype = files[i].mimetype;
        size = files[i].size;
      }
    }

    const title = req.body.title;
    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
    res.write('<h2>이미지 업로드 성공</h2>');
    res.write('</hr>');
    res.write(`<p>제목 : ${title}</p>`);
    res.write(`<p>원본파일명 : ${originalname}</p>`);
    res.write(`<p>현재파일명 : ${filename}</p>`);
    res.write(`<p>mimetype : ${mimetype}</p>`);
    res.write(`<p>파일크기 : ${size}</p>`);
    res.write(`<p><img src='/uploads/${filename}' width=200</p>`);
    res.end();
  } catch (e) {
    console.log(e);
  }
});

app.use('/', router);

app.listen(port, () => {
  console.log(`${port}포트로 서버 실행중...`);
});
