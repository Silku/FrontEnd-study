import React, {useState }from "react";

function Input(){
    const [text, setText] = useState('');
    const onChange = (e) =>{
        setText(e.target.value);
    }
    const onReset = () =>{
        setText('');
    }
    return(
        <div>
            <input onChange={onChange}/>
            <button onClick={onReset}>다시 쓰기</button>
            <div>
                <b>{text}</b>
            </div>
        </div>
    )
}

export default Input;