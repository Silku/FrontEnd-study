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

//127.0.0.1:3000/regist
router.route('/regist').post((req, res) => {
  const userid = req.body.userid;
  const userpw = req.body.userpw;
  const name = req.body.name;
  const gender = req.body.gender;

  console.log(
    `userid:${userid},userpw:${userpw},name:${name},gender:${gender}`
  );
  if (database) {
    joinUser(database, userid, userpw, name, gender, (err, result) => {
      if (err) {
        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
        res.write('<h2>회원가입 실패(server error)!</h2>');
        res.end;
      } else {
        if (result) {
          res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
          res.write('<h2>회원가입 성공!</h2>');
          res.end;
        } else {
          res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
          res.write('<h2>회원가입 실패!</h2>');
          res.end;
        }
      }
    });
  } else {
    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
    res.write('<h2>데이터베이스 연결실패!</h2>');
    res.end;
  }
});

const joinUser = function (userid, userpw, name, gender, callback) {
  const users = new UserModel({
    userid: userid,
    userpw: userpw,
    name: name,
    gender: gender,
  });
  users.save((err, result) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, result);
    }
  });
};

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
    UserSchema = mongoose.Schema({
      userid: String,
      userpw: String,
      name: String,
      gender: String,
    });
    console.log('UserSchema 생성완료.');

    UserModel = mongoose.model('user', UserSchema);
    console.log('UserModel이 정의되었습니다.');
  });
}

app.use('/', router);

app.listen(port, () => {
  console.log(`${port}포트로 서버 실행중... `);
  connectDB();
});
