import React, { memo } from "react";

const Try = memo(({tryInfo}) =>{
    // {tryInfo} 쓰던지 대신 (props)넣고  <div>props.tryInfo.try</div> 하던지
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
})

// class Try extends PureComponent{
//     render(){
//         const {tryInfo} = this.props;
//         return(
//             <li>
//                 <div>{tryInfo.try}</div>
//                 <div>{tryInfo.result}</div>
//             </li>
//         )
//     }
// }
export default Try; 