import React from 'react';
import Counter from './Counter';
import Button from './components/button';
import './App.css';

function App() {
  return (
    <div className='App'>
        <Counter/>
        <div className='buttons'>
				<Button size='large'>클릭하기 </Button>
				<Button >클릭하기 </Button>
				<Button size='small'>클릭하기 </Button>
        </div>
		<div className='buttons' >
				<Button size='large' color='gray'>클릭하기 </Button>
				<Button  color='gray'>클릭하기 </Button>
				<Button size='small' color='gray'>클릭하기 </Button>
        </div>
		<div className='buttons' >
				<Button size='large' color='violet'>클릭하기 </Button>
				<Button  color='violet'>클릭하기 </Button>
				<Button size='small' color='violet'>클릭하기 </Button>
        </div>
		<div className='buttons' >
				<Button size='large' color='pink'  outline>클릭하기 </Button>
				<Button  color='gray' outline>클릭하기 </Button>
				<Button size='small' color='violet' outline>클릭하기 </Button>
        </div>
		<div className='buttons' >
				<Button  color='pink'  fullWidth>클릭하기 </Button>
				<Button  color='gray' fullWidth>클릭하기 </Button>
				<Button  color='violet' fullWidth>클릭하기 </Button>
        </div>
    </div>

  );
}

export default App;