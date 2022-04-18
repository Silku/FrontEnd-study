//파일 다루는 모듈
const fs = require('fs');

//동기식 파일읽기
const text2 = fs.readFileSync('test.txt', 'utf-8');
console.log(`동기식 읽기 : ${text2}`);

//비동기식 파일읽기
// callback함수를 받는다 (파라미터1 : err, 파라미터2 : data)
// err, data는 임의로 지어준 파라미터 이름
// test.txt를 못읽었을경우 err을 파라미터로 받고, 읽었을경우 data파라미터를 받아 실행
const text = fs.readFile('test1.txt', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`비동기식 읽기 : ${data}`);
  }
});
