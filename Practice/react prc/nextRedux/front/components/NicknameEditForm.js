import React from 'react'
import {Form, Input } from 'antd'
import styled from 'styled-components'

const EditForm = styled(Form)`
	margin-bottom: 20px;
	border: 1px solid black;
	padding : 20px;
` 

const NicknameEditForm = () => {

	return (
		<Form>
			<Input.Search addonBefore="닉네임" enterButton="수정"/>
		</Form>
	)
}

export default NicknameEditForm
