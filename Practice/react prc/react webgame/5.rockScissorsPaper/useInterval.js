import {useRef, useEffect} from 'react';
// 커스텀 훅 사용해보기

/**
    const [isRunning, setRunning] = useState(true);
    useInterval(()=>{
        
    }, isRunning ? 1000: null)
 */


    // callback : 실행할부분 , 


function useInterval(callback, delay){
    const savedCallback = useRef();

    useEffect(()=>{
        savedCallback.current = callback;
    })

    useEffect(()=>{
        // delay가 null이 아니면 이부분이 실행
        // useRef로 항상 최신callback만 받게되서 아주 잠깐의 딜레이도 없앨수 있는 효과를 냄.
        function tick(){
            savedCallback.current();
        }

        if(delay !== null){
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    },[delay])

    return savedCallback.current;
}

export default useInterval;