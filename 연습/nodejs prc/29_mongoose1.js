const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

let database;
let UserSchema;
let UserModel;

function connectDB() {
  const url = 'mongodb://127.0.0.1:27017/frontend';
  mongoose.Promise = global.Promise;
  //promise : 비동기식 처리를 위한 객체
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  //{useNewUrlParser:true , useUnifiedTopology:true} : 에러방지 옵션
  database = mongoose.connection;
  database.on('error', console.error.bind(console, 'mongoose 연결 실패!'));
  database.on('open', () => {
    console.log('데이터베이스 연결 성공!');
  });
}

app.use('/', router);

app.listen(port, () => {
  console.log(`${port}포트로 서버 실행중... `);
  connectDB();
});
