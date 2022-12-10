import React, { useState } from 'react';
import './app.css';
import Canvas from './components/canvas/canvas';
import List from './components/list/list';

function App() {

	const addList = () => {
		
	}


	const [number, setNumber] = useState(0);

	const someFuction = () =>{
		console.log(`number : ${number}`)
		return;
	}


	return (
		<div className='app'>
			<h3 style={{marginTop:'30px'}}>Project Canvas</h3>
			<section className='container'>
				<Canvas/>
				<List addList={addList}/> 
				{/* <Test/> */}
			</section>
			
		</div>
	);
}

export default App;
