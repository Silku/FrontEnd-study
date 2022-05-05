// const express = require('express');
// const app = express();
module.exports = (app) => {
  app.get('/', (req, res) => {
    console.log('module1.js 실행상태');
    res.render('index.ejs', {
      length: 10,
    });
  });

  // http://127.0.0.1:3000/about
  app.get('/about', (req, res) => {
    // views/about.html
    res.render('about.html');
  });
};
