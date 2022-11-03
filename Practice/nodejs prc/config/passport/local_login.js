//패스포트 로컬 로그인
const LocalStrategy = require('passport-local').Strategy;

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
    let database = req.app.get('database');
    database.MemberModel.findOne({ userid: userid }, (err, user) => {
      if (err) {
        return done(err);
      } else {
        if (!user) {
          console.log('아이디를 찾을 수 없습니다.');
          return done(null, false);
        }
        let authenticate = user.authenticate(
          userpw,
          user.salt,
          user.hashed_password
        );
        if (!authenticate) {
          console.log('비밀번호가 일치하지 않습니다.');
          return done(null, false);
        }
        return done(null, user);
      }
    });
  }
);
