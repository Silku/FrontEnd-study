const events = require('events');

//이벤트 관련 메소드를 사용할 수 있는 EventEmitter 객체를 형성
const eventEmitter = new events.EventEmitter();

const connectHandler = function connected() {
  console.log('연결 성공!');
  //emit(): 이벤트를 발생
  eventEmitter.emit('data_received');
};

//on() : 이벤트와 이벤트 핸들러 연결
eventEmitter.on('connection', connectHandler);
eventEmitter.on('data_received', () => {
  console.log('데이터 수신됨!');
});
eventEmitter.emit('connection');
console.log('이벤트 종료');
