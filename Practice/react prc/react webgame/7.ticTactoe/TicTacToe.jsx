import React, { useState, useReducer, useCallback }  from 'react'
import Table from './Table';

const initialState = {
	winner : '',
	turn : 'o',
	tableData: [['','',''],['','',''],['','','']],
}

const SET_WINNER = 'SET_WINNER'

const reducer = (state, action) =>{
	switch(action, type){
		case SET_WINNER : 
		// 이건직접 바꾸면 안됨, 여기서 직접적으로  state.winner = action.winner하면 안됨. 
		return{
			...state,
			winner : action.winner,
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
			<Table onClick={onClickTable} tableData={state.tableData}></Table>
			<div>{}님의 턴입니다.</div>
			{state.winner &&  <div>{state.winner} 님의 승리!</div>}
		</>
	);
}


export default TicTacToe;
