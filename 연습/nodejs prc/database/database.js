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
  }
}

module.exports = database;
