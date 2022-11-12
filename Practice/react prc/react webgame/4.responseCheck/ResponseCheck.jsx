// import로 쓰는법
import React,{useRef, useState} from 'react';
// import  from 'react'

const ResponseCheck = () =>{
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);

    // class문법으로 쓸때는 이런식 =>  let startTime = 0; 
    const startTime = useRef();
    const endTime = useRef();
    const timeout = useRef(null);

    const onClickScreen = () =>{
        if(state == 'waiting'){
            setState('ready');
            setMessage('초록색이 되면 클릭!');

            timeout.current = setTimeout(()=>{
            setState('now');
            setMessage('지금 클릭하세요!');
            startTime.current= new Date();
            },Math.floor(Math.random() * 1000) +2000) //2~3초

        }else if(state == 'ready'){
            clearTimeout(timeout.current); //성급하게 누르면 타임아웃 초기화
            setState('now');
            setMessage('너무 성급해요!');
        }else if(state == 'now'){
            endTime.current = new Date();
            setState( 'waiting');
            setMessage('클릭해서 시작하기!');
            setResult((prevResult) =>{
                return  [...prevResult, endTime.current - startTime.current]
            })
        }
    }

    const onReset = () =>{
        setResult([]);
    }

    const renderAverage = () =>{
        return result.length === 0 
        ? null 
        : <>
            <div>평균 시간 : {result.reduce((a,c)=> a+c) / result.length}ms</div>
            <button onClick={onReset}>리셋</button>
        </>
    }

    return (
        <>
            <div
                id="screen"
                className={state}
                onClick={onClickScreen}
            >
                {message}   
            </div>
            {/* 
            {} 활용해서 if문 쓰는법 : 즉시 실행함수 형태로 감싸주고 써야함. 그리고 지저분함.
            {(()=>{
                if(result.length ===0){
                    return null;
                }else{
                    return <>
                    <div>평균 시간 : {result.reduce((a,c)=> a+c) / result.length}ms</div>
                    <button onClick={onReset}>리셋</button>
                </>
                }
            })()} 
            */}
            {renderAverage()}     
        </>
    )    
}



export default ResponseCheck; 

