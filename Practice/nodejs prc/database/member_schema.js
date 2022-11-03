const { Schema } = require('mongoose');
//npm i crypto
const crypto = require('crypto');
Schema.createSchema = function (mongoose) {
  console.log('createSchema() 호출!');
  const MemberSchema = mongoose.Schema({
    userid: { type: String, require: true, default: '' },
    hashed_password: { type: String, default: '' },
    name: { type: String, default: '' },
    salt: { type: String },
    age: { type: Number, default: '' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    provider: { type: String, default: '' },
    authToken: { type: String, default: '' },
    facebook: {},
  });
  //salt : 비밀번호 암호화할때 넣어주는 값

  MemberSchema.virtual('userpw')
    .set(function (userpw) {
      this._userpw = userpw;
      this.salt = this.makeSalt();
      this.hashed_password = this.encryptPassword(userpw);
    })
    .get(function () {
      return this._userpw;
    });

  MemberSchema.method('makeSalt', function () {
    console.log('makeSalt 호출!');
    return Math.round(new Date().valueOf() * Math.random()) + '';
  });

  MemberSchema.method('encryptPassword', function (plainText, inSalt) {
    if (inSalt) {
      //로그인시 사용되는 로직
      //sha1 라는 단방향암호화를 사용한다. 어떤걸? 내가전달받은문자(plainText), hex(16진수로)

      return crypto.createHmac('sha1', inSalt).update(plainText).digest('hex');
    } else {
      //회원가입시 사용되는 로직
      return crypto
        .createHmac('sha1', this.salt)
        .update(plainText)
        .digest('hex');
    }
  });
  MemberSchema.method(
    'authenticate',
    function (plainText, inSalt, hashed_password) {
      if (inSalt) {
        console.log('authenticate() 호출, inSalt 있음');
        return this.encryptPassword(plainText, inSalt) == hashed_password;
      } else {
        console.log('authenticate() 호출, inSalt 없음');
        return this.encryptPassword(plainText) == this.hashed_password;
      }
    }
  );

  //특정작업 이전에 미리 호출되는 메소드 -> 트리거 역할
  MemberSchema.pre('save', (next) => {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.userpw)) {
      next(new Error('유효하지 않은 password입니다.'));
    } else {
      next();
    }
  });

  const validatePresenceOf = function (value) {
    return value && value.length;
  };

  console.log('MemberSchema 정의 완료!');
  return MemberSchema;
};

module.exports = Schema;
