// const express = require('express');
// const app = express();
module.exports = (app, fs) => {
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

  // http://127.0.0.1:3000/list
  app.get('/list', (req, res) => {
    fs.readFile(__dirname + '/../data/member.json', 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.writeHead(200, { 'content-type': 'text/json;charset=utf-8' });
        res.end(data);
      }
    });
  });
  // http://127.0.0.1:3000/getMember/banana
  // : 콜론쓰면 변수로 취급할수 있음
  app.get('/getMember/:userid', (req, res) => {
    fs.readFile(__dirname + '/../data/member.json', 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const member = JSON.parse(data);
        res.json(member[req.params.userid]);
      }
    });
  });
};
