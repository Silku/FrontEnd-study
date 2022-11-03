module.exports = {
  server_port: 3000,
  db_url: 'mongodb://127.0.0.1:27017/frontend',
  db_schemas: [
    {
      file: './member_schema',
      collection: 'member2',
      schemaName: 'MemberSchema',
      modelName: 'MemberModel',
    },
  ],
  facebook: {
    clientID: '1063988204210944',
    clientSecret: 'ab3ab41969bc56f5d987a66db517abf0',
    callbackURL: 'http://127.0.0.1:3000/auth/facebook/callback',
  },
};
