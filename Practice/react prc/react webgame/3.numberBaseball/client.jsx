// const React = require('react')
// const ReactDOM = require('react-dom')
// 리액트 18버전 기준
import React from 'react';
import ReactDOM from 'react-dom/client';

// const NumberBaseBall = require('./NumberBaseBall')
import NumberBaseBall from './NumberBaseBall'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NumberBaseBall />
  </React.StrictMode>
);

// ReactDOM.render(
//     <NumberBaseBall/>,  document.getElementById('root')
// );