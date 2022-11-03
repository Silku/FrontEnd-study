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
    joinUser(userid, userpw, name, gender, (err, result) => {
      if (err) {
        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
        res.write('<h2>회원가입 실패(server error)!</h2>');
        res.end();
      } else {
        if (result) {
          res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
          res.write('<h2>회원가입 성공!</h2>');
          res.end();
        } else {
          res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
          res.write('<h2>회원가입 실패!</h2>');
          res.end();
        }
      }
    });
  } else {
    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
    res.write('<h2>데이터베이스 연결실패!</h2>');
    res.end();
  }
});

//127.0.0.1:3000/login
router.route('/login').post((req, res) => {
  const userid = req.body.userid;
  const userpw = req.body.userpw;
  console.log(`userid:${userid}, userpw:${userpw}`);
  if (database) {
    loginUser(userid, userpw, (err, result) => {
      if (err) {
        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
        res.write('<h2>로그인 실패(server error)!</h2>');
        res.end();
      } else {
        if (result) {
          console.log(result);
          const name = result[0].name;
          const gender = result[0].gender;
          res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
          res.write(`<p>아이디 : ${userid}</p>`);
          res.write(`<p>이름 : ${name}</p>`);
          res.write(`<p>성별 : ${gender}</p>`);
          res.end();
        } else {
          res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
          res.write('<h2>로그인 실패!</h2>');
          res.end();
        }
      }
    });
  } else {
    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
    res.write('<h2>데이터베이스 연결실패!</h2>');
    res.end();
  }
});

//127.0.0.1:3000/list
router.route('/list').get((req, res) => {
  if (database) {
    UserModel.findAll((err, result) => {
      if (err) {
        console.log(err);
        console.log('리스트 조회 실패');
        return;
      } else {
        if (result) {
          res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
          res.write('<h2>회원 리스트</h2>');
          res.write('<div><ul>');
          for (let i = 0; i < result.length; i++) {
            const userid = result[i].userid;
            const name = result[i].name;
            const gender = result[i].gender;
            res.write(`<li>${i}:${userid}/${name}/ ${gender}</li>`);
          }
          res.write('</ul></div>');
          res.end();
        } else {
          res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
          res.write('<h2>회원정보가 없습니다.</h2>');
          res.end();
        }
      }
    });
  } else {
    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
    res.write('<h2>데이터베이스 연결실패!</h2>');
    res.end();
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
      callback(err, null);
      return;
    } else {
      callback(null, result);
    }
  });
};

const loginUser = function (userid, userpw, callback) {
  UserModel.find({ userid: userid, userpw: userpw }, (err, result) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      if (result.length > 0) {
        console.log('일치하는 사용자를 찾음');
        callback(null, result);
      } else {
        console.log('일치하는 사용자가 없음');
        callback(null, null);
      }
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

    //ex
    UserSchema.static('findAll', function (callback) {
      return this.find({}, callback);
    });

    UserModel = mongoose.model('user', UserSchema);
    //'user'는 자동으로 s붙여서 users로 몽고db 컬렉션이 만들어짐
    console.log('UserModel이 정의되었습니다.');
  });
}

app.use('/', router);

app.listen(port, () => {
  console.log(`${port}포트로 서버 실행중... `);
  connectDB();
});
