import React from "react";
import './TestStyle.css';

function Info(){
 return(   
   <article className="info">
   <div className="helpDesk">
     <h3>080-123-1234</h3>
     <p>평일: 09:00 ~ 18:00</p>
     <p>토요일: 09:00 ~ 13:00</p>
     <p>공휴일/일요일은 휴뮤</p>
   </div>
   <div className="location"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6523.911080228113!2d129.0541504775216!3d35.15772954286725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3568eb6f0706e76b%3A0xb351f56d66deda37!2z67aA7IKw6rSR7Jet7IucIOu2gOyCsOynhOq1rCDrtoDsoITrj5kg67aA7KCE66Gc!5e0!3m2!1sko!2skr!4v1632886023308!5m2!1sko!2skr" width="850" height="160"  allowfullscreen="" loading="lazy"></iframe></div>
 </article>
 );
}

export default Info