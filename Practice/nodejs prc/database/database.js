const mongoose = require('mongoose');
let database = {};

database.init = function (app, config) {
  console.log('database init() 호출!');
  connect(app, config);
};

function connect(app, config) {
  console.log('connect()호출');
  mongoose.Promise = global.Promise;
  mongoose.connect(config.db_url);
  database.db = mongoose.connection;
  database.db.on(
    'error',
    console.error.bind(console, 'mongoose connection error!')
  );
  database.db.on('open', () => {
    console.log('데이터베이스 연결 성공!');
    createSchema(app, config);
  });
}

function createSchema(app, config) {
  const schemaLen = config.db_schemas.length;
  console.log(`스키마 갯수 : ${schemaLen}`);
  for (let i = 0; i < schemaLen; i++) {
    /*
    { file: './member_schema',
      collection: 'member2',
      schemaName: 'MemberSchema',
      modelName: 'MemberMode'},
    */
    let curItem = config.db_schemas[i];
    let curSchema = require(curItem.file).createSchema(mongoose);
    console.log(`${curItem.file}모듈을 불러온 후 스키마를 정의함`);

    let curModel = mongoose.model(curItem.collection, curSchema);
    console.log(`${curItem.collection} 컬렉션을 위해 모델을 정의함`);

    database[curItem.schemaName] = curSchema; // database[MemberSchema] = MemberSchema 객체.
    database[curItem.modelName] = curModel; //// database[MemberModel] = MemberModel 객체.
    console.log(
      `스키마이름[${curItem.schemaName}], 모델이름[${curItem.modelName}]이 데이터베이스 객체의 속성으로 추가됨`
    );
    app.set('database', database);
    console.log('database객체가 app객체의 속성으로 추가됨');
  }
}

module.exports = database;
