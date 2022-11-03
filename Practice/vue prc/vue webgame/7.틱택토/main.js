import Vue from 'vue';

import TicTacToe from './TicTacToe.vue';
// 웹팩은 기본적으로 자바스크립트를 합치는 역할, 
// vue파일을 불러올수 없어서 에러를 일으킴
// => webpack.config.js   -> module , rules에 vue를 불러올수 있도록 설정

new Vue(TicTacToe).$mount('#root');