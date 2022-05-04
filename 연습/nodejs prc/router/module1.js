// const express = require('express');
// const app = express();
module.exports = (app) => {
  app.get('/', (req, res) => {
    console.log('module1.js 실행상태');
    res.render('index.ejs', {
      length: 10,
    });
  });
};
