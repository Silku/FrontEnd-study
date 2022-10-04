const path = require('path');
// path 조작을 도와주는 node



module.exports = {
    name: 'wordrelay',
    mode: 'development', // 실서비스: production
    devtool: 'eval', // 실서비스: hidden-source-map
    //resolve : entry에 등록된 파일명에 해당하는 확장자를 웹팩에서 자동으로 찾아줌
    resolve : {
        extensions : ['.js', '.jsx']
    },

    // entry : 입력하는 부분
    entry : {
        app : './client',
    },
    // output : 출력하는 부분
    output : {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
    },
 
};

