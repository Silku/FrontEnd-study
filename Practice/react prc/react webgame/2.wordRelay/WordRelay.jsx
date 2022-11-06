const React = require('react')
const { useState, useRef } = require('react');



// Hooks 문법
const WordRelay = () =>{
    const [word, setWord] = useState('서대문');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);


    const onSubmitForm = (e) =>{
        e.preventDefault();
        if(word[word.length - 1] === value[0]){
            setResult('정답');
            setWord(value);
            value('');
            inputRef.current.focus();
            // class 문법으로 쓰던것 this.input.focus();
        }else{
            setResult('오답');
            value('');
            inputRef.current.focus();
        }
    }

    const onChangeInput = (e) =>{
        setValue(e.target.value);
    }

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="wordInput">글자를 입력하세요.</label>
                <input id="wordInput" 
                className="wordInput" 
                ref={inputRef}
                value={value} 
                onChange={onChangeInput}/>
                <button>입력!</button>
            </form>
            <div>{result}</div>
        </>
    )
}


module.exports = WordRelay;