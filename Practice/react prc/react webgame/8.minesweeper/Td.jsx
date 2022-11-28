import React, { useCallback, useContext } from 'react'
import {  CODE, CLICK_MINE, OPEN_CELL, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL, TableContext } from './MineSweeper'

/**
 * 	MINE : - 7,
	NORMAL : -1,
	QUESTION : -2,
	FLAG : -3,
	QUESTION_MINE: -4,
	FLAG_MINE: -5,
	CLICKED_MINE : -6,
	OPENED : 0,
	*/
const getTdStyle = (code) =>{
	switch(code){
		case CODE.NORMAL :
			return {
				background: '#bbb'
			}
		case CODE.CLICKED_MINE :
			return {
				background : 'red'
			}
		case CODE.MINE :
			return {
				background : '#444'
			}
		case CODE.QUESTION_MINE :
		case CODE.QUESTION :
			return {
				background:'#bbb'
			}
		case CODE.FLAG_MINE :
		case CODE.FLAG :
			return {
				background:'#bbb'
			}
		case CODE.OPENED :
			return {
				background: '#fff'
			}
		default : 
			return  {
				background : '#fff'
			}
	} 
}

const getTdText = (code) =>{

	switch(code){
		case CODE.MINE : 
		return '💥';
		case CODE.QUESTION : 
		return '❔';
		case CODE.FLAG : 
		return '🚩';
		case CODE.QUESTION_MINE : 
		return '';
		case CODE.FLAG_MINE : 
		return '';
		case CODE.CLICKED_MINE : 
		return '💥';
		default : 
			return '';
	}
}


const Td = ({rowIndex, cellIndex}) => {
	const {tableData, gameStop, dispatch} = useContext(TableContext)

	const onClickTd = useCallback(()=>{
		if(gameStop){
			return;
		}
		switch(tableData[rowIndex][cellIndex]){
			case CODE.MINE : 
			dispatch({type:CLICK_MINE, row:rowIndex, cell:cellIndex})
			return ''
			case CODE.NORMAL : 
			dispatch({type:OPEN_CELL, row:rowIndex, cell:cellIndex})
			return;
			case CODE.QUESTION : 
			return '';
			case CODE.FLAG : 
			return '';
			case CODE.QUESTION_MINE : 
			return '';
			case CODE.FLAG_MINE : 
			return '';
			case CODE.CLICKED_MINE : 
			return '';
			case CODE.OPENED : 
		}
		dispatch({type:OPEN_CELL, row:rowIndex, cell:cellIndex});
	},[tableData[rowIndex][cellIndex],gameStop])

	const onRightClickTd = useCallback((e)=>{
		e.preventDefault();
		if(gameStop){
			return;
		}
		switch(tableData[rowIndex][cellIndex]){
			case CODE.NORMAL:
			case CODE.MINE:
				dispatch({type:FLAG_CELL, row:rowIndex, cell:cellIndex});
				return;
			case CODE.FLAG_MINE:
			case CODE.FLAG:
				dispatch({type:QUESTION_CELL, row:rowIndex, cell:cellIndex});
				return;
			case CODE.QUESTION_MINE:
			case CODE.QUESTION:
				dispatch({type:NORMALIZE_CELL, row:rowIndex, cell:cellIndex});
				return;
			default:
				return;
		}
	},[tableData[rowIndex][cellIndex],gameStop])

	return (
		<td
			style={getTdStyle(tableData[rowIndex][cellIndex])}
			onClick={onClickTd}
			onContextMenu={onRightClickTd} //우클릭시
		>{getTdText(tableData[rowIndex][cellIndex])}</td>
	)
}

export default Td