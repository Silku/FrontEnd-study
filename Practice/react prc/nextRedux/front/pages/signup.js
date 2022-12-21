import React, { useCallback,useState, useEffect } from 'react'
import Head from 'next/head'
import { Checkbox, Form ,Input , Button} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'next/router'
import useInput from '../hooks/useInput'

import AppLayout from '../components/AppLayout'
import styled from 'styled-components'
import { SIGN_UP_REQUEST } from '../reducers/user'


const ErrorMessage = styled.div`
	color:red;
`


const Signup = () => {
	const dispatch = useDispatch();
	const {signUpLoading, signUpDone, signUpError, user} = useSelector((state) => state.user);

	const [email, onChangeEmail] = useInput('')
	const [nickname, onChangeNickname] = useInput('')
	const [password, onChangePassword] = useInput('')
	
	const [passwordChk, setPasswordChk] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [term,setTerm] = useState('');
	const [termError, setTermError] = useState(false);

	useEffect(()=>{
		if(user && user.id){
			// push()는 뒤로가기 페이지에 저장됨, replace가 여기선 좋음
			Router.replace('/')
		}
	},[user && user.id])

	useEffect(()=>{
		if(signUpDone){
			Router.replace('/')
		}
	},[signUpDone])

	useEffect(()=>{
		if(signUpError){
			alert(signUpError)
		}
	},[signUpError])


	const onChangePasswordCheck = useCallback((e)=>{
		setPasswordChk(e.target.value);
		setPasswordError(e.target.value !== password)
		console.log(setPasswordChk)
	},[password])

	const onChangeTerm = useCallback((e)=>{
		setTerm(e.target.checked);
		setTermError(false);
	},[])

	const onSubmitForm =useCallback(()=>{
		if(password !== passwordChk){
			return setPasswordError(true);
		}
		if(!term){
			return setTermError(true);
		}
		console.log(email, nickname, password, passwordChk, term)
		dispatch({
			type:SIGN_UP_REQUEST,
			data : {email, password, nickname}
		})
	},[email, password,passwordChk,term])

	return (
		<>
			<Head>
				<title>Sign Up | Next Board</title>
			</Head>
			<AppLayout>
				<Form onFinish={onSubmitForm}>
					<div>
						<label htmlFor='user-email'>아이디(이메일)</label>
						<br/>
						<Input name='user-email' type='email' value={email} onChange={onChangeEmail} required/>
					</div>
					<div>
						<label htmlFor='user-nick'>닉네임</label>
						<br/>
						<Input name='user-nick' value={nickname} onChange={onChangeNickname} required/>
					</div>
					<div>
						<label htmlFor='user-password'>비밀번호</label>
						<br/>
						<Input name='user-password' type='password' value={password} onChange={onChangePassword} required/>
					</div>
					<div>
						<label htmlFor='user-password-chk'>비밀번호 확인</label>
						<br/>
						<Input 
							name='user-password-chk' 
							type='password' 
							value={passwordChk} 
							onChange={onChangePasswordCheck} 
							required/>
					</div>
					{passwordError && <ErrorMessage>비밀번호가 일치 하지 않습니다.</ErrorMessage>}
					<Checkbox name='user-term'checked={term} onChange={onChangeTerm}>회원 약관에 동의합니다.</Checkbox>
					{termError && <ErrorMessage>약관에 동의해주세요.</ErrorMessage>}
					<div style={{marginTop:10}}>
						<Button type="primary" htmlType="submit" loading={signUpLoading}>회원가입</Button>
					</div>
				</Form>
			</AppLayout>
		</>
	)
}

// git Test
export default Signup