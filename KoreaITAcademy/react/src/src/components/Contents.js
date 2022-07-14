import React from "react";
import './TestStyle.css';
import News from './News';
import Product from './Product';
import Gallery from './Gallery';
import Info from './Info';

function Header(){
return(
<>
  <section className="contents">
      <div className="contents_in">
        <News/>
        <Product/>
        <Gallery/>
        <Info/>
       
        <article className="">event</article>
      </div>
  </section>
</>
);
}

export default Header;


