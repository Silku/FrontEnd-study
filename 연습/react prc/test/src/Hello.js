import React from "react";

// function Hello(props){
//     return <div style={{color:props.color}}>안녕하세요! {props.name}님!</div>
// }

function Hello({color, name , isVIP}){
    return (
        <div style= {{color}}>
            안녕하세요! {name}님!
            {/* {isVIP ? <b>❤😊</b> : null} */}
            {isVIP && <b>❤😊</b>}
        </div>
    )
}

Hello.defaultProps = {
    name : 'noname',
    color : 'deepskyblue'
}

export default Hello;