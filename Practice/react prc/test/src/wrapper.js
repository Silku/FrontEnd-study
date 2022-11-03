import React from "react";
function Wrapper ({children}){
    const style = {
        border : '3px solid red',
        padding : '10'
    };
    return (
        <div style={style}>
            {children}
        </div>
    )
}
export default Wrapper