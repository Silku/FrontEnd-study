const React = require('react')
const ReactDOM = require('react-dom')


const WordRelay = require('./WordRelay')

// ReactDOM.render(<WordRelay/>, document.querySelector('#root'));  //이전문법;
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<WordRelay/>);