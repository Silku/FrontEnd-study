import React from 'react'
import Td from './Td'

const Tr = ({rowData, rowIndex, dispatch}) => {
  // Table에서 받은 rowIndex는 받아오고 cellIndex는  다시 td로 전달
  return (
    <tr>
      {Array(rowData.length).fill().map((td, i)=>(
      <Td dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>))}
    </tr>
  )
}

export default Tr