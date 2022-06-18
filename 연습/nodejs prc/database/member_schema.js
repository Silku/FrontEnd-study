const { Schema } = require('mongoose');

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
};

module.exports = Schema;
