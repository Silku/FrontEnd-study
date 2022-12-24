import React, { useCallback } from 'react'
import {Form, Input } from 'antd'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import useInput from '../hooks/useInput'
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user'

const EditForm = styled(Form)`
	margin-bottom: 20px;
	border: 1px solid black;
	padding : 20px;
` 

const NicknameEditForm = () => {
	const {user} = useSelector((state)=>state.user);
	const [nickname, onChangeNickname] = useInput(user?.nickname ||'')
	const dispatch = useDispatch();

	const onSubmit = useCallback(()=>{
		dispatch({
			type:CHANGE_NICKNAME_REQUEST,
			data:nickname
		})
	},[nickname])

	return (
		<Form >
			<Input.Search 
			value={nickname}
			onChange={onChangeNickname}
			addonBefore="닉네임" 
			enterButton="수정"
			onSearch={onSubmit}
			/>
		</Form>
	)
}

export default NicknameEditForm
