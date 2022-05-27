const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
//mongodb의 MongoClient 클래스 객체를 사용

const app = express();
const router = express.Router();
const port = 3000;

//몽고db 연결 객체
let database;

app.use(bodyParser.urlencoded({ extended: false }));

//몽고 db 연결 함수
function connectDB() {
  const databaseURL = 'mongodb://localhost:27017';

  //몽고db랑 실제로 연결하는 함수
  MongoClient.connect(databaseURL, (err, db) => {
    if (err) {
      console.log(err);
    } else {
      const temp = db.db('frontend');
      database = temp;
      console.log('mongodb 데이터베이스 연결 성공!');
    }
  });
}

app.use('/', router);

app.listen(port, () => {
  console.log(`${port}포트로 서버 동작중..`);
  connectDB();
});
