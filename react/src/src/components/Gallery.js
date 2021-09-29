import React from "react";
import './TestStyle.css';

function Gallery(){
 return(   
   <article className="gallery">
   <div className="l_img"><img src="http://placeimg.com/640/480/any"/></div>
   <ul className="list">
      <li><img src="http://placeimg.com/640/480/any"/></li>
      <li><img src="http://placeimg.com/640/480/any"/></li>
      <li><img src="http://placeimg.com/640/480/any"/></li>
      <li><img src="http://placeimg.com/640/480/any"/></li>
   </ul>
 </article>
 );
}

export default Gallery