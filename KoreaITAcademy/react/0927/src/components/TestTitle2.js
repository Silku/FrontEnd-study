import React from "react";
import '../App.css';

function TestTitle2(){
  const date = new Date();
  const subject = (date.getSeconds() % 2 === 0) ?"리액트":"노드";
  const title = `${subject}학습가이드`;
  const titleStyles = {color:'#c0ffee', textDecoration:'underline'}

  return(
   <header className="TestTitle2">
     {/* <h2 style={{color:'#c0ffee', textDecoration:'underline'}}>{title}</h2> */}
     <h2 style={titleStyles}>{title}</h2>
   </header>
  );
}

export default TestTitle2;
