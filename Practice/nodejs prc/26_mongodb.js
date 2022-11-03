const express = require('express');
const bodyParser = require('body-parser');
const e = require('express');
const MongoClient = require('mongodb').MongoClient;
//mongodb의 MongoClient 클래스 객체를 사용

const app = express();
const router = express.Router();
const port = 3000;

//몽고db 연결 객체
let database;

app.use(bodyParser.urlencoded({ extended: false }));

//회원가입 만들기 - http://127.0.0.1:3000/member/regist (post)
router.route('/member/regist').post((req, res) => {
  console.log('/member/regist 호출됨!');
  const userid = req.body.userid;
  const userpw = req.body.userpw;
  const name = req.body.name;
  const gender = req.body.gender;
  console.log(
    `userid:${userid}, userpw:${userpw}, name:${name}, gender:${gender}`
  );
  if (database) {
    joinMember(database, userid, userpw, name, gender, (err, result) => {
      if (err) {
        res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
        res.write('<h2>회원가입 실패!</h2>');
        res.write('<h2>오류가 발생했습니다.</h2>');
        res.end();
      } else {
        if (result.insertCount > 0) {
          res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
          res.write('<h2>회원가입 성공!</h2>');
          res.write('<h2>가입이 성공적으로 완료되었습니다.</h2>');
          res.end();
        } else {
          res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
          res.write('<h2>회원가입 실패!</h2>');
          res.write('<h2>회원가입에 실패하였습니다.</h2>');
          res.end();
        }
      }
    });
  } else {
    res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
    res.write('<h2>데이터베이스 연결 실패!</h2>');
    res.write('<h2>mongodb 데이터 베이스 연결 안됨!</h2>');
    res.end();
  }
});

//로그인 만들기 - http://127.0.0.1:3000/member/login (post)
router.route('/member/login').post((req, res) => {
  console.log('/member/login 호출!');
  const userid = req.body.userid;
  const userpw = req.body.userpw;
  console.log(`userid:${userid}, userpw:${userpw}`);
  if (database) {
    loginMember(database, userid, userpw, (err, result) => {
      if (err) {
        console.log(err);
        res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
        res.write('<h2>로그인 실패!</h2>');
        res.write('<h2>오류가 발생했습니다.</h2>');
        res.end();
      } else {
        if (result) {
          const result_userid = result[0].userid;
          const result_userpw = result[0].userpw;
          const result_name = result[0].name;
          const result_gender = result[0].gender;
          res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
          res.write('<h2>로그인 성공!</h2>');
          res.write(`<p>아이디 : ${result_userid}</p>`);
          res.write(`<p>패스워드 : ${result_userpw}</p>`);
          res.write(`<p>이름 : ${result_name}</p>`);
          res.write(`<p>성별 : ${result_gender}</p>`);
          res.end();
        } else {
          res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
          res.write('<h2>로그인 실패!</h2>');
          res.write('<p>아이디 또는 비밀번호를 확인하세요.</p>');
          res.end();
        }
      }
    });
  } else {
    res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
    res.write('<h2>데이터베이스 연결 실패!</h2>');
    res.write('<h2>mongodb 데이터 베이스 연결 안됨!</h2>');
    res.end();
  }
});

//정보 수정하기 - http://127.0.0.1:3000/member/edit (put)
router.route('/member/edit').put((req, res) => {
  console.log('/member/edit 호출!');
  const userid = req.body.userid;
  const userpw = req.body.userpw;
  const name = req.body.name;
  const gender = req.body.gender;

  console.log(
    `userid:${userid}, userpw:${userpw}, name:${name}, gender:${gender}`
  );

  if (database) {
    editMember(database, userid, userpw, name, gender, (err, result) => {
      if (err) {
        res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
        res.write('<h2>회원정보 수정 실패!</h2>');
        res.write('<p>오류가 발생했습니다.</p>');
        res.end();
      } else {
        if (result.modifiedCount > 0) {
          res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
          res.write('<h2>회원정보 수정 성공!</h2>');
          res.write('<p>회원정보 수정에 성공했습니다.</p>');
          res.end();
        } else {
          res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
          res.write('<h2>회원정보 수정 실패!</h2>');
          res.write('<p>회원정보 수정에 실패했습니다.</p>');
          res.end();
        }
      }
    });
  } else {
    res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
    res.write('<h2>데이터베이스 연결 실패!</h2>');
    res.write('<h2>mongodb 데이터 베이스 연결 안됨!</h2>');
    res.end();
  }
});

//회원 삭제하기 - http://127.0.0.1:3000/member/delete (delete)
router.route('/member/delete').delete((req, res) => {
  console.log('/member/delete 호출!');
  const userid = req.body.userid;
  console.log(`userid:${userid}`);

  if (database) {
    deleteMember(database, userid, (err, result) => {
      if (err) {
        res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
        res.write('<h2>회원 삭제 실패!</h2>');
        res.write('<p>오류가 발생했습니다.</p>');
        res.end();
      } else {
        if (result.deleteCount > 0) {
          res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
          res.write('<h2>회원 삭제 성공!</h2>');
          res.write('<p>회원 삭제에 성공했습니다.</p>');
          res.end();
        } else {
          res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
          res.write('<h2>회원 삭제 실패!</h2>');
          res.write('<p>회원 삭제에 실패했습니다.</p>');
          res.end();
        }
      }
    });
  } else {
    res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
    res.write('<h2>데이터베이스 연결 실패!</h2>');
    res.write('<h2>mongodb 데이터 베이스 연결 안됨!</h2>');
    res.end();
  }
});

const joinMember = function (database, userid, userpw, name, gender, callback) {
  console.log('joinMember 호출됨.');
  const members = database.collection('member');
  //insertMany = members 컬렉션으로 가져온 데이터를 객체로 저장하게 해줄수 있는 메소드
  members.insertMany(
    [{ userid: userid, userpw: userpw, name: name, gender: gender }],
    (err, result) => {
      if (err) {
        console.log(err);
        callback(err, null);
        return;
      } else {
        if (result.insertedCount > 0) {
          console.log(
            `사용자 document ${result.insertedCount}명이 추가 되었습니다.`
          );
        } else {
          console.log(`사용자 document가 추가되지 않았습니다.`);
        }
        callback(null, result);
      }
    }
  );
};

const loginMember = function (database, userid, userpw, callback) {
  console.log('loginMember 호출!');
  const members = database.collection('member');

  members.find({ userid: userid, userpw: userpw }).toArray((err, result) => {
    if (err) {
      console.log(err);
      callback(err, null);
      return;
    } else {
      if (result.length > 0) {
        console.log('사용자를 찾았습니다.');
        callback(null, result);
      } else {
        console.log('일치하는 사용자가 없습니다.');
        callback(null, null);
      }
    }
  });
};

const editMember = function (database, userid, userpw, name, gender, callback) {
  console.log('editMember 호출!');
  const members = database.collection('member');
  //아래에서 $set 뒤에 나머지 파라미터를 안넣어주면 나머지 값들이 지워질수 있으므로 다 넣어줘야함
  members.updateOne(
    { userid: userid },
    { $set: { userid: userid, userpw: userpw, name: name, gender: gender } },
    (err, result) => {
      if (err) {
        console.log(err);
        callback(err, null);
        return;
      } else {
        //modifiedCount : 수정된 숫자가 들어옴 , 수정된 프로퍼티가 1 이상이라면
        if (result.modifiedCount > 0) {
          console.log(
            `사용자 document ${result.modifiedCount}명 수정되었습니다.`
          );
        } else {
          console.log('수정된 document가 없습니다.');
        }
        callback(null, result);
      }
    }
  );
};

const deleteMember = function (database, userid, callback) {
  console.log(`deleteMember 호출!`);
  const members = database.collection('member');

  members.deleteOne({ userid: userid }, (err, result) => {
    if (err) {
      console.log(err);
      callback(err, null);
      return;
    } else {
      if (result.deleteCount > 0) {
        console.log(`사용자 document${result.deleteCount}명 삭제되었습니다.`);
      } else {
        console.log('삭제된 사용자가 없습니다.');
      }
      callback(null, result);
    }
  });
};

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
