import React from "react";
import './button.scss';

function Button({children}){
    return <button className="Button">{children}</button>
}

export default Button;