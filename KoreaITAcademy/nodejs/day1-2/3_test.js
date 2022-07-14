const fs = require('fs');

const text = fs.readFileSync('text.txt','utf-8');
console.log(`동기식으로 읽음:${text}`);