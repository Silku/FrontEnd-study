//패스포트 로컬 회원가입
//npm i passport-local
const LocalStrategy = require('passport-local').Strategy;

//메모 : passReqToCallback : 패스워드 옳은지 아닌지 여부 응답
module.exports = new LocalStrategy(
  {
    usernameField: 'userid',
    passwordField: 'userpw',
    passReqToCallback: true,
  },
  (req, userid, userpw, done) => {
    const name = req.body.name;
    const age = req.body.age;
    console.log(
      `passport의 local-signup 호출 : userid : ${userid}, userpw: ${userpw}, name:${name}, age : ${age}`
    );

    //실행문장에서 데이터가 블로킹되지않도록 사용(비동기 방식으로 변경) , 여러사람이 동시다발적으로 가입할 경우
    process.nextTick(() => {
      let database = req.app.get('database');
      database.MemberModel.findOne({ userid: userid }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          console.log('이미 가입된 계정입니다.');
          return done(null, false);
        } else {
          const user = new database.MemberModel({
            userid: userid,
            userpw: userpw,
            name: name,
            age: age,
          });
          user.save((err) => {
            if (err) {
              throw err;
            }
            console.log('가입완료');
            return done(null, user);
          });
        }
      });
    });
  }
);
