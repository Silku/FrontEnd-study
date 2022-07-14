import React from "react";
import './TestStyle.css';

function Btns(pros){
 
  return(
    <li>{pros.btn}</li>
    );
}

function Nav(){
return(
<>
       <nav className="main_nav">
            <ul>
                <Btns btn="회사소개" />
                <Btns btn="제품소개" />
                <Btns btn="채용정보" />
                <Btns btn="커뮤니티" />
                <Btns btn="협력업체" />
            </ul>
       </nav>
  </>
);
}

export default Nav;