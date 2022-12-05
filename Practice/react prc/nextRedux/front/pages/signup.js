import React, { useCallback,useState } from 'react'
import useInput from '../hooks/useInput'
import Head from 'next/head'
import { Checkbox, Form ,Input , Button} from 'antd'
import AppLayout from '../components/AppLayout'
import styled from 'styled-components'

const ErrorMessage = styled.div`
	color:red;
`

const Signup = () => {

	const [id, onChangeId] = useInput('')
	const [nickname, onChangeNickname] = useInput('')
	const [pw, onChangePw] = useInput('')
	
	const [pwChk, setPwChk] = useState('');
	const [pwError, setPwError] = useState(false);
	const [term,setTerm] = useState('');
	const [termError, setTermError] = useState(false);

	const onChangePwCheck = useCallback((e)=>{
		setPwChk(e.target.value);
		setPwError(e.target.value !== pw)
		console.log(setPwChk)
	},[pw])

	const onChangeTerm = useCallback((e)=>{
		setTerm(e.target.checked);
		setTermError(false);
	},[])

	const onSubmitForm =useCallback(()=>{
		if(pw !== pwChk){
			return setPwError(true);
		}
		if(!term){
			return setTermError(true);
		}
		console.log(id, nickname, pw, pwChk, term)
	},[pw,pwChk,term])

	return (
		<>
			<Head>
				<title>Sign Up | Next Board</title>
			</Head>
			<AppLayout>
				<Form onFinish={onSubmitForm}>
					<div>
						<label htmlFor='user-id'>아이디</label>
						<br/>
						<Input name='user-id' value={id} onChange={onChangeId} required/>
					</div>
					<div>
						<label htmlFor='user-nick'>닉네임</label>
						<br/>
						<Input name='user-nick' value={nickname} onChange={onChangeNickname} required/>
					</div>
					<div>
						<label htmlFor='user-pw'>비밀번호</label>
						<br/>
						<Input name='user-pw' type='password' value={pw} onChange={onChangePw} required/>
					</div>
					<div>
						<label htmlFor='user-pw-chk'>비밀번호 확인</label>
						<br/>
						<Input 
							name='user-pw-chk' 
							type='password' 
							value={pwChk} 
							onChange={onChangePwCheck} 
							required/>
					</div>
					{pwError && <ErrorMessage>비밀번호가 일치 하지 않습니다.</ErrorMessage>}
					<Checkbox name='user-term'checked={term} onChange={onChangeTerm}>회원 약관에 동의합니다.</Checkbox>
					{termError && <ErrorMessage>약관에 동의해주세요.</ErrorMessage>}
					<div style={{marginTop:10}}>
						<Button type="primary" htmlType="submit">회원가입</Button>
					</div>
				</Form>
			</AppLayout>
		</>
	)
}

export default Signup