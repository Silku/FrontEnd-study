const path = require('path');
// path 조작을 도와주는 node



module.exports = {
    name: 'wordrelay',
    mode: 'development', // 실서비스: production
    devtool: 'eval', // 실서비스: hidden-source-map

    // entry : 입력하는 부분
    entry : {
        app : ['./client.jsx', './WordRelay.jsx'],
    },
    // output : 출력하는 부분
    output : {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
    },

};

