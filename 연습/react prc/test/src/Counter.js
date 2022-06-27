import React , {useState} from "react";

function Counter(){

    const [number, setNumber] = useState(0);

    const onIncrease = () => {
        
        console.log('더하기 1')
        setNumber(number + 1)
    }

    const onDecrease = () => {
        console.log(number)
        console.log('빼기 1')
    }
    return(
        <div>
            <h2>{number}</h2>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    )
}

export default Counter;