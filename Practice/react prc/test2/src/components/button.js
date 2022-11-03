import React from "react";
import classNames from  'classnames'
import './button.scss';


//props로 넘기기 (size)
function Button({children , size, color, outline, fullWidth}){
    // return 이렇게도 가능  (classname를 쓰기 이전)
    // return <button className={['Button', size, color, outline].join(' ')}>{children}</button>
    // return <button className={`Button ${size} ${color} ${outline}`}>{children}</button>
    return <button className={classNames('Button', size, color, {outline, fullWidth})}>{children}</button>

}

Button.defaultProps = {
    size : 'medium',
    color : 'pink'
}

export default Button; 