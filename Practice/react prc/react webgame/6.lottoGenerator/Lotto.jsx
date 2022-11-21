import React, { useEffect, useState ,useRef, useMemo, useCallback } from 'react'
import Ball from './Ball';

function getWinNumbers(){
	console.log('getWinNumbers');
	const candidate = Array(45).fill().map((v,i) => i +1); 
	const shuffle = [];
	while(candidate.length > 0){
		shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.length),1)[0]);  
	}
	const bonusNumber = shuffle[shuffle.length -1];
	const winNumbers = shuffle.slice(0,6).sort((p,c) => p-c);
	return [...winNumbers, bonusNumber];
}

const Lotto = () =>{
	// tip : hooks쓰면 선언순서 잘 지켜서 써야한다. 조건문, 함수,반복문에 왠만하면 넣지말것.
	const [winBalls, setWinBalls] = useState([]);
	const lottoNumbers = useMemo(()=> getWinNumbers(),[]) //useMemo를 써줌으로써 반복 호출하지 않고 한 프로세스(?)가 끝날떄까지 기억해두는 역할
	const [winNumbers, setWinNumbers]= useState(lottoNumbers);
	const [bonus , setBonus] = useState(null);
	const [redo, setRedo] = useState(false);

	const timeouts = useRef([]);

	useEffect(()=>{
		console.log('useEffect')
		for(let i = 0; i< winNumbers.length -1; i++){
			timeouts.current[i] = setTimeout(()=>{
				setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
			},(i+1) * 1000);
		}
		timeouts.current[6] = setTimeout(()=>{
			setBonus(winNumbers[6])
			setRedo(true);
		},7000);
		return () =>{
			timeouts.current.forEach((v)=>{
				clearTimeout(v);
			});
		}
	},[timeouts.current]) //timeouts.current가 onClickRedo실행되면서 []로 바뀜. 그러므로 timeout.current 부분을 넣어줘서 didupdate를 수행하게끔 함.
	// 끝에 빈배열이면 componentDidMount와 동일하게 작동
	// 배열에 요소가 있으면 componentDidMount와 componentDidUpdate 둘다 수행
	// return문은 componentWilUnmount 수행



	// 사실 useCallback따로 안써도 됨. 예제를 위한 예제.
	//  => winNumbers빼고 빈배열로 둘 경우, console.log찍어보면 맨 처음기억했던 숫자가 계속 나옴
	const onClickRedo = useCallback(() =>{
			console.log(winNumbers)
			setWinNumbers(getWinNumbers());
			setWinBalls([]);
			setBonus(null);
			setRedo(false);
			timeouts.current = [];//Ref
			},[winNumbers]); //winNumbers가 바뀌면 재실행되도록

	return (
		<>
			<div>당첨숫자</div>
			<div id="결과창"> 
				{winBalls.map((v) => <Ball key={v} number={v}/>)}
			</div>
			<div>보너스</div>
			{bonus && <Ball number = {bonus}/>}
			{/* and &&, 둘다 true되면 뒤에꺼 return */}
			{redo &&<button onClick={onClickRedo}>한번 더!</button>}
		</>
	);
}


export default Lotto;
