import React, { useState, useCallback, useContext, } from 'react'
import {START_GAME, TableContext } from './MineSweeper';

const Form = () => {
    const [cell,setCell] = useState(10);
    const [row,setRow] = useState(10);
    const [mine,setMine] = useState(20);
    const {dispatch} = useContext(TableContext);

    const onChangeCell = useCallback((e)=>{
        setCell(e.target.value);
    },[])

    const onChangeRow = useCallback((e) =>{
        setRow(e.target.value);
    },[])

    const onChangeMine = useCallback((e) =>{
        setMine(e.target.value);
    },[])

    const onClickBtn = useCallback(()=>{
        dispatch({type:START_GAME, row, cell ,mine})
    },[row,cell,mine])

    return (
        <div>
            <label >가로 <input type="number" placeholder="가로" value={cell} onChange={onChangeCell}></input></label>            
            <label >세로 <input type="number" placeholder="세로" value={row} onChange={onChangeRow}></input></label>
            <label>지뢰 <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine}></input></label>
            <button onClick={onClickBtn}>시작</button>
        </div>
    )
}

export default Form