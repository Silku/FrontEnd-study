// import로 쓰는법
import React,{useRef, useState} from 'react';
// import  from 'react'

const ResponseCheck = () =>{
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);

    let startTime = 0;
    let endTime = 0;
    let timeout = null;

    const onClickScreen = () =>{
        if(state == 'waiting'){
            setState('ready');
            setMessage('초록색이 되면 클릭!');

            timeout = setTimeout(()=>{
            setState('now');
            setMessage('지금 클릭하세요!');
            startTime= new Date();
            },Math.floor(Math.random() * 1000) +2000) //2~3초

        }else if(state == 'ready'){
            clearTimeout(timeout); //성급하게 누르면 타임아웃 초기화
            setState('now');
            setMessage('너무 성급해요!');
        }else if(state == 'now'){
            endTime = new Date();
            setState( 'waiting');
            setMessage('클릭해서 시작하기!');
        }
    }

    // const renderAverage = () =>{
    //     const {result} = state;
    //     return result.length === 0 
    //         ? null 
    //         : <div>평균 시간 : {result.length.reduce((a,c)=> a+c) / result.length}ms</div>      
    // }

    return (
        <>
            <div
                id="screen"
                className={state}
                onClick={onClickScreen}
            >
                {message}   
            </div>
            {result.length === 0 
            ? null 
            : <div>평균 시간 : {result.reduce((a,c)=> a+c) / result.length}ms</div>}     
        </>
    )    
}



export default ResponseCheck; 

