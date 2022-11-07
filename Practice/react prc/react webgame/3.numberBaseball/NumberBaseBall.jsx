// import로 쓰는법
import React,{useState} from 'react';
// import  from 'react'
import Try from './Try';

// 숫자 4개를 겹치지 않고 랜덤하게 4개 뽑는 함수,
function getNumbers(){
    const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9]; 
    const array = [];
    for (let i = 0; i < 4; i += 1) {
        const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
} 


const NumberBaseBall = ()=> {
    const [result,setResult] = useState('');
    const [value,setValue] = useState('');
    const [answer,setAnswer] = useState(getNumbers); //lazy init , 늦은 초기화
    //'useState를 쓸때' getNumbers ,getNumbers() 차이 : getNumbers로넣어주면 리렌더링 될때 다시 실행안됨.  getNumbers()이렇게 쓰면 리렝더링될떄 계속 실행되서 비효율적
    const [tries,setTries] = useState([]);

    const onSubmitForm = (e) =>{
        e.preventDefault();
        setResult('')
        if (value === answer.join('')) {
            //정답은 배열형태로 되있으므로 join해야 비교할수 있음
            setResult(`홈런! 정답은 ${answer}입니다`)
            setTries((prevTries) =>{
                [...prevTries, {try:value, result:`홈런!`}]
                // React: 배열에는 push()를 못씀, 불변성에 어긋나서..  그래서 이문법 씀[...preValue , {value} ]
            });
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
            alert('성공! 게임을 다시 실행합니다!')
            // e.current.focus();
        } else {
            // 정답이 아닐때
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) {
                //10번 시도
                setResult(`실패!! 10번 넘게 틀렸습니다. 정답은 ${answer.join(', ')}였습니다!.`);
                alert('실패! 게임을 다시 실행합니다.')
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            }else{
                // 10번 이하로 틀릴때
                const answerArray = value.split('').map(v => parseInt(v));
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === answer[i]) {
                        //숫자 자릿수 모두 정답
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        //숫자만 정답 
                        ball += 1;
                    }
                }
                setTries((prevTries) => 
                    [...prevTries, {try:value, result:`${strike} 스트라이크 , ${ball} 볼입니다.`}]);
                setValue('');
            }
        }
    }

    const onChangeInput = (e) =>{
        setValue(e.target.value)
        console.log(e.target.value);
    };

    return (
        <>
            <h2>{result}</h2>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} 
                value={value}
                onChange={onChangeInput}></input>
            </form>
            <div>시도 : {tries.length}</div>
            <ul>
                {tries.map((v,i) => {
                    return (
                        <Try key={`${i+1}차 시도 : `} tryInfo={v} />
                    )
                })}
            </ul>
        </>
    )    
}


// es2015 문법 : 노드랑 호환이 되는 문법정도로 알아두면 됨.
export default NumberBaseBall; //import NumberBaseBall

// default로 쓰는것 이외의 경우
export const hello = 'hello' // import {hello}

// webpack쪽은 node로 돌아가기때문에 require 써주는데, app.jsx, client.jsx 이런거..  리액트 앱만드는 부분은 import 쓰면된다.



/* require 방식으로 쓰는법
const React = require('react')
const { useState } = require('react');

const NumberBaseBall= ()=> {
    const [word,setWord] = useState('문자열');

    return (
        <>
            <h1>테스트{word}</h1>
        </>
    )

}
module.exports = NumberBaseBall;
*/