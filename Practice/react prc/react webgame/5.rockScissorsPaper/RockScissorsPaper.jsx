import React,{useEffect, useRef, useState} from 'react';
import useInterval from './useInterval';

const rspCoords = {
    가위:'-139px',
    바위:'-2px',
    보:'-285px'
}

const scores = {
    가위 : 1,
    바위 : 0,
    보 : -1,
}

const computerChoice= (imgCoord) => {
    return Object.entries(rspCoords).find(function(v){
        return v[1] === imgCoord;
    })[0];
}

const RockScissorsPaper = () =>{
    const [result, setResult] = useState('');
    const [score,setScore] = useState(0);
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    
    // useInterval 커스텀 훅으로 대체
    // const interval = useRef(null);

    // useEffect(()=>{//componentDidMount,componentDidUpdate 역할
    //     interval.current = setInterval(changeHand, 100);
    //     return () =>{ //componentWillUnmount역할
    //         clearInterval(interval.current);
    //     }
    //     //아래에 있는 imgCoord가 바뀔때마다 useEffect안에 있는 함수들이 계속 실행됨.
    // }, [imgCoord]);

    const [isRunning, setIsRunning] = useState(true);

    const changeHand = () =>{
        if(imgCoord == rspCoords.바위){
            setImgCoord(rspCoords.가위);
        }else if(imgCoord == rspCoords.가위){
            setImgCoord(rspCoords.보);
        }else if(imgCoord == rspCoords.보){
            setImgCoord (rspCoords.바위);
        }
    };

    useInterval(changeHand , isRunning ? 100 : null);



     // useInterval 커스텀 훅으로 대체
    // const onClickButton = (choice) =>  () =>{
    //     clearInterval(interval.current);
    //     const myScore = scores[choice];
    //     const cpuScore = scores[computerChoice(imgCoord)];
    //     const diff = myScore - cpuScore;
    //     if(diff === 0){
    //         setResult('비겼습니다.');
    //     }else if ([-1, 2].includes(diff)){
    //         setResult('이겼습니다.') ;
    //         setScore((prevScore) => prevScore+1);
    //     }else {
    //         setResult('졌습니다.') 
    //         setScore((prevScore) => prevScore-1);
    //     }
    //     setTimeout(()=>{
    //         interval.current = setInterval(changeHand, 100)
    //     },1000)
    // };

        const onClickButton = (choice) =>  () =>{
            if(isRunning){
                setIsRunning(false);
                const myScore = scores[choice];
                const cpuScore = scores[computerChoice(imgCoord)];
                const diff = myScore - cpuScore;
                if(diff === 0){
                    setResult('비겼습니다.');
                }else if ([-1, 2].includes(diff)){
                    setResult('이겼습니다.') ;
                    setScore((prevScore) => prevScore+1);
                }else {
                    setResult('졌습니다.') 
                    setScore((prevScore) => prevScore-1);
                }
            }
            setTimeout(()=>{
                setIsRunning(true);
            },1000)
    };


    return ( 
        <>
            <div 
                id="computer"
                style={{background : `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}
            >
            </div>
            <div>
                <button id="scissor"  className="btn" onClick={onClickButton('가위')}>가위</button>
                <button id="rock" className="btn" onClick={onClickButton('바위')}>바위</button>
                <button id="papar" className="btn" onClick={onClickButton('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 점수 : {score}점</div>
        </>
    )

}



export default RockScissorsPaper; 

