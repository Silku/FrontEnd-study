// 나중에 쓸때 ex1 부분 날릴것

import React from 'react';
import Test from './Test';
import './App.css';
import Hello from './Hello';
import Wrapper from './wrapper';
import Counter from './Counter';
import Input from './Input';
import Input2 from './Input2';
import Input3 from './Input3';
import MemberList from './MemberList';

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
      <Hello name="뤼액트" color="hotpink" isVIP = {true}></Hello>
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
      <Hello name="테스트"  isVIP/>
      {/* hello.js에 있는 isVIP값이 true면 특수문자를 띄워주는건데, isVIP가 삽입되어 있기만 해도 값이 true이기 떄문에 이렇게 써줘도 동작함 */}
      <hr/>
      <Counter/>
      <Input/>
      <Input2/>
      <Input3/>
      <MemberList/>
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