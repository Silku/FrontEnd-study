import React, {useState }from "react";

function Input2(){
    const [users, setUsers] = useState({
        userid:'',
        name:''
    });

    const {userid, name} = users;


    //스프레드 문법
    const onChange = (e) =>{
        const {value, name} = e.target;
        setUsers({
            ...users,
            [name]:value
        })
    }
    const onReset = () =>{
        setUsers({
            userid:'',
            name:''
        })
    }
    return(
        <div>
            <input name="userid" value={userid} onChange={onChange}placeholder="아이디"/>
            <input name="name" value={name} onChange={onChange}placeholder="이름"/>
            <button onClick={onReset}>다시 쓰기</button>
            <div>
                <b>{name}님의 아이디는 {userid}입니다.</b>
            </div>
        </div>
    )
}

export default Input2;