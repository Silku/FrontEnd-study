

import React from 'react';
import Test from './Test';
import './App.css';
import Hello from './Hello';
import Wrapper from './wrapper';

const userid  = '관리자';
const style = {
  color : '#f5f5f5',
  backgroundColor : 'deepskyblue',
  fontSize : 30,
  padding : 20
}

function App() {
  return (
    <div>
      <Hello name="뤼액트" color="hotpink"></Hello>
      <div style={style}>{userid}님! 안녕하세요?</div>
      {/*변수를 출력하려면 중괄호를 사용함*/}
      <div className='box'>Hello React!</div>
      <Test 
        //태그안에는 슬러시 주석이 가능
      /> 
      <Test /> 
      <Wrapper>
        <Test /> 
        <Test />
      </Wrapper>
      <Hello/>
      <Hello name="테스트"/>
    </div>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React--------!!
        </a>
      </header>
    </div>
  );
}
 */