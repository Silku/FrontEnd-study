const fs = require('fs');

//동기식 파일 관리 => 예외처리 하는법

try {
  const text = fs.readFileSync('test99.txt', 'utf-8');
} catch (e) {
  console.log('동기식 파일읽기 실패!');
}

console.log('프로그램을 종료함니다.');
