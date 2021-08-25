const events = require('events');

// 이벤트 관련 메소드를 사용할 수 있는 EventEmitter 객체를 만듭니다.
const eventEmitter = new events.EventEmitter();

const connectHandler = function connected() {
  // 2. connectHandler 실행
  console.log('연결 성공!');
  eventEmitter.emit('data_received'); // 3. data_received 발생
};

// connection 이벤트와 connectHandler 핸들러와 연결
eventEmitter.on('connection', connectHandler);

// data_receive 이벤트와 익명함수와 연결
eventEmitter.on('data_received', () => {
  // 4. 익명함수 실행
  console.log('데이터 수신!');
});

eventEmitter.emit('connection'); // 1. connection 발생
console.log('프로그램을 종료합니다.');
