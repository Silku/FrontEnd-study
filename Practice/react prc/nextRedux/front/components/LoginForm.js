import React, { useState, useCallback } from 'react'
import { Button, Form, Input } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ButtonWrapper = styled.div`
    margin-top: 10px;
`
const LoginFormStyle = styled(Form)`
    padding : 10px;
`

const LoginForm = ({setIsLogIn}) => {
    const [id, setId] = useState('')
    const [pw, setPw] = useState('')
    const [pwChk, setPwChk] = useState('')
    let password = ''

    // 컴포넌트에 props로 넘기면 usecallback 쓰기!!
    const onChangeId = useCallback((e) =>{
        setId(e.target.value);
    },[])

    const onChangePw = useCallback((e) =>{
        setPw(e.target.value);
    },[])

    const onSubmitForm = useCallback(() =>{
    // andt에는 e.preventDefault가 기본적용되있음
        console.log(id,pw);
        setIsLogIn(true)
    },[id,pw])

    return (
        <LoginFormStyle onFinish={onSubmitForm}>
            <div>
                <label htmlFor='user-id'>아이디</label>
                <Input name='user-id' 
                    value={id} 
                    onChange={onChangeId} 
                    required
                ></Input>
            </div>
            <div>
            <label htmlFor='user-pw' >비밀번호</label>
                <Input 
                    name='user-pw'
                    type='password'
                    value={pw}
                    onChange={onChangePw}
                    required
                ></Input>
            </div>
            <ButtonWrapper>
                <Button type='primary' htmlType='submit' loading={false}>
                    로그인
                </Button>
                <Link href="signup">
                    <a><Button>회원가입</Button></a>
                </Link>
            </ButtonWrapper>
        </LoginFormStyle>
    )
}
LoginForm.PropTypes = {
    setIsLogIn : PropTypes.func.isRequired,
}

export default LoginForm