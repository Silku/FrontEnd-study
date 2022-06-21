const express = require('express');
const static = require('serve-static');
const path = require('path');
const logger = require('morgan');

//npm i socket.io
const socketio = require('socket.io');
//npm i cors , cors policy의 그 cors임 도와주는 모듈
const cors = require('cors');

const port = 3000;
const app = express();

app.use(logger('dev'));
//클라이언트에서 ajax로 요청
app.use(cors());

app.use('/public', static(path.join(__dirname, 'public')));

const server = app.listen(port, () => {
  console.log(`${port}포트로 서버 실행중...`);
});

const io = socketio(server);

io.sockets.on('connection', (socket) => {
  console.dir(`connection : ${socket.request.connection._peername}`);
  socket.remoteAddress = socket.request.connection._peername.address;
  socket.remotePort = socket.request.connection._peername.port;
  console.log(`socket.remoteAddress : ${socket.remoteAddress}`);
  console.log(`socket.remotePort  : ${socket.remotePort}`);

  socket.on('message', function (message) {
    console.log('message 이벤트를 받았습니다.');
    console.dir(message);
  });
});
