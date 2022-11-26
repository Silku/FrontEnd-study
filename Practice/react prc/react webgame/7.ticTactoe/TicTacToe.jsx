import React, { useReducer, useCallback, useEffect }  from 'react'
import Table from './Table';

const initialState = {
	winner : '',
	turn : 'O',
	tableData: [['','',''],['','',''],['','','']],
	recentCell : [-1,-1] //마지막에 클릭한 셀 저장용
}

export const SET_WINNER = 'SET_WINNER'
// td로 전달해야되니 모듈화하는게 좋다.
export const CLICK_CELL = 'CLICK_CELL'
export const CHANGE_TURN= 'CHANGE_TURN'
export const RESET_GAME= 'RESET_GAME'

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
				tableData,
				recentCell : [action.row, action.cell], //마지막에 클릭한 셀의 위치
			}
		}
		case CHANGE_TURN:{
			return {
				...state,
				turn: state.turn === 'O' ? 'X' : 'O',
			}
		}
		case RESET_GAME : {
			return {
				...state,
				turn : 'O',
				tableData: [['','',''],['','',''],['','','']],
				recentCell : [-1,-1] 
			}
		}
		default:
			return state;
	}
}

const TicTacToe = () =>{
	const [state, dispatch] = useReducer(reducer, initialState); //3번째 인자로 lazyinitialize 지연초기화라고 있음.
	const {winner,  turn, tableData , recentCell } = state;

	// reducer 쓰면 useState 이렇게 안씀
	// const [winner, setWinner] = useState('')
	// const [turn, setTurn] = useState('O');
	// const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);

	const onClickTable = useCallback(()=>{
		dispatch({type: SET_WINNER, winner:'O'}); //dispatch안에있는건 액션객체
		// dispatch(action)를 실행할때 마다 reducer가 작동, 
	},[])

	//비통기 state에서 뭔가를 처리할때 useEffect를 쓴다.
	useEffect(()=>{
		const [row, cell] = recentCell;
		if(row<0){
			return;
		}
		let win = false;
		if(tableData[row][0] === turn &&
			tableData[row][1] === turn &&
			tableData[row][2] === turn){
			win= true;
		}
		if(tableData[0][cell] === turn &&
			tableData[1][cell] === turn &&
			tableData[2][cell] === turn){
			win= true;
		}
		if(tableData[0][0] === turn &&
			tableData[1][1] === turn &&
			tableData[2][2] === turn){
			win= true;
		}
		if(tableData[0][2] === turn &&
			tableData[1][1] === turn &&
			tableData[2][0] === turn){
			win= true;
		}

		if(win){ //승리시 
			dispatch({type:SET_WINNER, winner:turn})
			dispatch({type: RESET_GAME});
		}else{
			// 무승부일경우
			let all = true; // all = true 무승부
			tableData.forEach((row)=>{
				row.forEach((cell)=>{
					if(!cell){
						all=false;
					}
				})
			});
			if(all){
				dispatch({type: RESET_GAME});
				alert('게임이 무승부로 끝났습니다!')
			}else{
				dispatch({type:CHANGE_TURN})
			}
		}

	},[recentCell])

	return (
		<>
			<Table onClick={onClickTable} tableData={state.tableData } dispatch={dispatch}></Table>
			<div>{turn}님의 턴입니다.</div>
			{state.winner &&  <div>{state.winner} 님의 승리!</div>}
		</>
	);
}


export default TicTacToe;
