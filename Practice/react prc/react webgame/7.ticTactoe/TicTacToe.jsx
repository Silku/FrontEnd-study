import React, { useState, useReducer, useCallback }  from 'react'
import Table from './Table';

const initialState = {
	winner : '',
	turn : 'o',
	tableData: [['','',''],['','',''],['','','']],
}

export const SET_WINNER = 'SET_WINNER'
// td로 전달해야되니 모듈화하는게 좋다.
export const CLICK_CELL = 'CLICK_CELL'
export const CHANGE_TURN= 'CHANGE_TURN'

const reducer = (state, action) =>{
	switch(action.type){
		case SET_WINNER : 
		// 이건직접 바꾸면 안됨, 여기서 직접적으로  state.winner = action.winner하면 안됨. 
		return{
			...state,
			winner : action.winner,
		}
		case CLICK_CELL : {
			const tableData = [...state.tableData]; //얕은복사 , 데이터 불변성을 위함
			tableData[action.row] = [...tableData[action.row]];
			tableData[action.row][action.cell] = state.turn; //현재 턴
			return{
				...state,
				tableData
			}
		}
		case CHANGE_TURN:{
			return {
				...state,
				turn: state.turn === 'O' ? 'X' : 'O',
			}
		}
	}
}

const TicTacToe = () =>{
	const [state, dispatch] = useReducer(reducer, initialState); //3번째 인자로 lazyinitialize 지연초기화라고 있음.

	// reducer 쓰면 이렇게 안씀
	// const [winner, setWinner] = useState('')
	// const [turn, setTurn] = useState('O');
	// const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);

	const onClickTable = useCallback(()=>{
		dispatch({type: SET_WINNER, winner:'O'}); //dispatch안에있는건 액션객체
		// dispatch(action)를 실행할때 마다 reducer가 작동, 
	},[])

	return (
		<>
			<Table onClick={onClickTable} tableData={state.tableData } dispatch={dispatch}></Table>
			<div>{}님의 턴입니다.</div>
			{state.winner &&  <div>{state.winner} 님의 승리!</div>}
		</>
	);
}


export default TicTacToe;
