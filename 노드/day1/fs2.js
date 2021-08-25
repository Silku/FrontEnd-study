const fs = require('fs');
const data = 'Hello Node.js!!';

const text1 = fs.writeFile('text1.txt', data, 'utf-8', (err) => {
  if (err) {
    console.log('에러발생!');
  } else {
    console.log(`저장완료/비동기 : ${text1}`);
  }
});

const text2 = fs.writeFileSync('text1.txt', data, 'utf-8');
console.log(`저장완료/동기: ${text2}`);
