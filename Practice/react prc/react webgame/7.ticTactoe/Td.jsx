import React, { useCallback } from 'react'
import { CLICK_CELL, CHANGE_TURN} from './TicTacToe'

// Table의 rowindex, Tr의 cellIndex
const Td = ({rowIndex,cellIndex, dispatch, cellData }) => {
  const onClickTd = useCallback(() =>{
    console.log(rowIndex,cellIndex)
    // 아래는 tictactoe.jsx에서 reducer로 처리
    dispatch({type:CLICK_CELL, row:rowIndex, cell:cellIndex})
    dispatch({type:CHANGE_TURN})
  },[])
  return (
      <td onClick={onClickTd}>{cellData}</td>
  )
}

export default Td