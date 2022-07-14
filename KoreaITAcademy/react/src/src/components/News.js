import React from "react";
import './TestStyle.css';

function News(){
 return(   
    <article className="news">
            <header className="news_h">
                <h3>NEWS</h3> 
                <span>more</span>
            </header>
            <section className="news_b">
                <ul>
                        <li>우리회사 홈페이지입니다</li>
                        <li>우리회사 홈페이지입니다</li>
                        <li>우리회사 홈페이지입니다</li>
                        <li>우리회사 홈페이지입니다</li>
                </ul>
            </section>
    </article>
 );
}

export default News