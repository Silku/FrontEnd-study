import React,{memo} from 'react';

// 함수컴포넌트, (hooks가 아님, hooks import {useState}처럼 임포트 해오는거)  
const Ball = memo(({number}) =>{
    let background;
    if(number <=10){
        background='red'
    }else if(number <=20){
        background='orange'
    }else if(number <=30){
        background='yellow'
    }else if(number <=40){
        background='blue'
    }else{
        background='green'
    }
    return (
        <div className='ball' style={{background}}>
            {number}
        </div>
    );
})



export default Ball;