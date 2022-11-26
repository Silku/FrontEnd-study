import React, { useCallback, useEffect, useRef, useMemo} from 'react'
import { CLICK_CELL} from './TicTacToe'

// Table의 rowindex, Tr의 cellIndex
const Td = ({rowIndex,cellIndex, dispatch, cellData }) => {
  

  // react쓸때 값확인을 위한 console.log찍는법, 어떤게 렌더링을 유발하는지 모르겠을때 쓸 수 있는 방법
  const ref = useRef([])
  useEffect(()=>{
    console.log(rowIndex === ref.current[0], cellIndex === ref.current[1] , dispatch === ref.current[2], cellData === ref.current[3])
    ref.current = [rowIndex, cellIndex, dispatch,cellData];
  },[rowIndex, cellIndex, dispatch,cellData])


  const onClickTd =
    useCallback(() =>{
      console.log(rowIndex,cellIndex)
      if(cellData){//Click하면 cellData가 생기니깐 같은 cell 눌러도 OX안바뀌게 방지
        return
      }
      // 아래는 tictactoe.jsx에서 reducer로 처리
      dispatch({type:CLICK_CELL, row:rowIndex, cell:cellIndex})
  
    },[cellData])
    return (
        <td onClick={onClickTd}>{cellData}</td>
    )
}

export default Td