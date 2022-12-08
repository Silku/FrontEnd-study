import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import useInput from '../hooks/useInput';
import { Button, Form, Input } from 'antd'
import { useSelector } from 'react-redux';

const CommentForm = ({post}) => {
    const id = useSelector((state) => state.user.user?.id)
    // useInput 커스텀훅 : state받아서 바인딩하는 함수 만들었던거
    const [commentText, onChangeCommentText] = useInput();
    const onSubmitComment = useCallback(()=>{
        console.log(post.id, commentText);
    },[commentText])
    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{position:"relative"}}>
                <Input.TextArea 
                style={{resize:"none"}}
                value={commentText} 
                onChange={onChangeCommentText} 
                rows={4} />
                <Button 
                style={{position:'absolute', right:0, bottom:-40}}
                type="primary" htmlType="submit">댓글남기기</Button>
            </Form.Item>
        </Form>
    )
}

CommentForm.PropTypes ={
    post : PropTypes.object.isRequired
}

export default CommentForm