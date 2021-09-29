import React from "react";
import './TestStyle.css';
import Nav from "./Nav";

function Header(){
return(
<>
  <header className="header">
      <div className="header_in">
        <h1 className="logo">리액트 제목</h1>
        <Nav/>
      </div>
  </header>
</>
);
}

export default Header;