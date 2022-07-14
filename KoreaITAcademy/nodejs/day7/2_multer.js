const express = require('express');
const bodyParser = require('body-parser');
// npm i serve-static 가상의디렉토리를 설정
const static = require('serve-static');
const path = require('path');//주소를 콘트롤
// npm i morgan 
const logger = require('morgan');//사이트에 접속했을때 사용자 로그 남기는 모듈
// npm i multer
const multer = require('multer');

const port = 3000;

const app = express();
const router = express.Router();

//미드웨어 설정
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', static(path.join(__dirname, 'public')));//현재 url에 연결
app.use('/uploads', static(path.join(__dirname, 'uploads')));//public,uploads폴더 생성
app.use(logger('dev')); // dev, short, common, bombined 사용자정보가 보임


//multer 설정
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads');//에러는 없다고 설정하고 콜백함수로 저장하는 폴더설정
    },
    filename: (req, file, callback) => { //익명함수를 사용하여 파일링을 호출 apple.jpg
        const extension = path.extname(file.originalname); //확장명을 호출(원래파일명)
        const basename = path.basename(file.originalname, extension);
       //파일명만 호출
        callback(null, basename + "_" + Date.now() + extension);
        // apple.jpg
        // apple_32904820394.jpg
    }
});

const upload = multer({
    storage: storage,
    limit: { //제한을 설정
        files: 1,
        fileSize: 1024 * 1024 * 100  
    }
});

//router.route('/write'). write로 파일을 보여주고
//post(upload.array('photo', 1) post로 보내면서 배열로 그리고 photo라는 파일명 1개 받음

router.route('/write').post(upload.array('photo', 1), (req, res) => {
    console.log('/write 호출!');
    try {
       //const title = req.body.title;
       // console.dir(req.files[0]);
       //write.html 생성
        const title = req.body.title;
        const content = req.body.content;
        const files = req.files;
        console.dir(req.files[0]);
        const originalname = files[0].originalname;
        const filename = files[0].filename;
        const mimetype = files[0].mimetype;
        const size = files[0].size;

        console.log(`파일정보 : 원본파일명:${originalname}, 파일이름:${filename}, mimetype:${mimetype}, 파일크기:${size}`);

        res.writeHead('200', {'content-type':'text/html;charset=utf8'});
        res.write('<h2>파일 업로드 성공</h2>');
        res.write('<hr>');
        res.write(`<p>제목 : ${title}</p>`);
        res.write(`<p>내용 : ${content}</p>`);
        res.write(`<p>원본파일명 : ${originalname}</p>`);
        res.write(`<p>파일명 : ${filename}</p>`);
        res.write(`<p>mimetype : ${mimetype}</p>`);
        res.write(`<p>파일크기 : ${size}</p>`);
        res.write(`<p><img src='/uploads/${filename}' width='200'></p>`);
        res.end();
    }catch(e){
        console.log(e);//예외사항
    }
});

app.use("/", router);  //라우터 등록

app.listen(port, () => { 
    console.log(`${port}포트로 서버 동작중...`);
});
//사용자 기다리게 하고