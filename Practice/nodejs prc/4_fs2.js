const fs = require('fs');
const data = '안녕 노드.js~!!';
const data2 = '안녕 노드.js~!! 이건 비동기식으로 쓰기한거야!';

//동기식 파일 쓰기
fs.writeFileSync('text2.txt', data, 'utf-8');
console.log('동기식 파일 쓰기');

//비동기식 파일 쓰기
fs.writeFile('text3.txt', data2, 'utf-8', (err) => {
  if (err) {
    console.log('에러!');
  } else {
    console.log('비동기 파일 쓰기!');
  }
});
