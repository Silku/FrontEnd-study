// import로 쓰는법
import React,{useState} from 'react';
// import  from 'react'


const NumberBaseBall= ()=> {
    const [word,setWord] = useState('문자열');

    return (
        <>
            <h1>테스트{word}</h1>
        </>
    )

}

// es2015 문법
export default NumberBaseBall; //import NumberBaseBall

// default로 쓰는것 이외의 경우
export const hello = 'hello' // import {hello}




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