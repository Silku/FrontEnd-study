import React, { useState, useCallback, useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { loginRequestAction } from '../reducers/user'
import useInput from '../hooks/useInput'

const ButtonWrapper = styled.div`
    margin-top: 10px;
`
const LoginFormStyle = styled(Form)`
    padding : 10px;
`

const LoginForm = () => {
    const dispatch = useDispatch()
    const {logInLoading, logInError} = useSelector((state) => state.user) 

    const [email, onChangeemail] = useInput('');
    const [password, onChangePassword] = useInput('')
    
    useEffect(()=>{
        if(logInError){
            alert(logInError)
        }
    },[logInError])

    const onSubmitForm = useCallback(() =>{
    // andt에는 e.preventDefault가 기본적용되있음
        console.log(email,password);
        dispatch(loginRequestAction({email, password}))
    },[email,password])

    return (
        <LoginFormStyle onFinish={onSubmitForm}>
            <div>
                <label htmlFor='user-email'>아이디(이메일)</label>
                <Input name='user-email' 
                    value={email} 
                    onChange={onChangeemail} 
                    required
                ></Input>
            </div>
            <div>
            <label htmlFor='user-password' >비밀번호</label>
                <Input 
                    name='user-password'
                    type='password'
                    value={password}
                    onChange={onChangePassword}
                    required
                ></Input>
            </div>
            <ButtonWrapper>
                <Button type='primary' htmlType='submit' loading={logInLoading}>
                    로그인
                </Button>
                <Link href="signup">
                    <a><Button>회원가입</Button></a>
                </Link>
            </ButtonWrapper>
        </LoginFormStyle>
    )
}


export default LoginForm