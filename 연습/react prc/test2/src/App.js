import React from 'react';
import Counter from './Counter';
import Button from './components/button';
import './App.css';
import Box from './box';
import styled, {css, ThemeProvider} from 'styled-components';
import Button2 from './components/styledButton';

// 백틱 주의
const Circle = styled.div`
	margin: 2rem auto;
	width: 5rem;
	height : 5rem;
	/* props로 전달된건 전달된 값을 받고 아닌건 deepskyblue색으로 */
	background : ${props => props.color || 'deepskyblue'};
	border-radius: 50%;
	${props => props.big && css`
		width: 10rem;
		height : 10rem;
	`}
`;

const AppBlock = styled.div`
	width:380px;
	margin : 0 auto;
	margin-top : 4rem;
	border: 1px solid black;
	padding : 1rem;
`;

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
		<Box/>
		<ThemeProvider 
			theme={{
				palette : {
					blue: '#4169E1',
					gray : '#495057',
					pink : '#f08080',
					green : '#50f250'
				}
			}}>
			<Circle/>
			<Circle color="deeppink"/>
			<Circle color="gold" big/>
			<AppBlock>
				<Button2 color="gray">클릭하기</Button2>
				<Button2 color="pink">클릭하기</Button2>
				<Button2 color="green">클릭하기</Button2>
			</AppBlock>
		</ThemeProvider>
    </div>

  );
}

export default App;