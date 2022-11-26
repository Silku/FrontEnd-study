import React, {useMemo} from 'react'
import Td from './Td'

const Tr = ({rowData, rowIndex, dispatch}) => {
  // Table에서 받은 rowIndex는 받아오고 cellIndex는  다시 td로 전달
  return (
    <tr>
      {Array(rowData.length).fill().map((td, i)=>(
        useMemo(()=>
        <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>
        ,[rowData[i]]
        )
      ))}
    </tr>
  )
}

export default Tr