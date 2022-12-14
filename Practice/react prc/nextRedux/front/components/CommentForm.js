import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useInput from '../hooks/useInput';
import { Button, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({post}) => {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.user?.id)
    const {addCommentDone, addCommentLoading} = useSelector((state) => state.post)

    const [commentText, onChangeCommentText, setCommentText] = useInput();

    useEffect(()=>{
        if(addCommentDone){
            setCommentText('');
        }
    },[addCommentDone])

    const onSubmitComment = useCallback(()=>{
        console.log('post id+코멘트' + post.id, commentText);  
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {content : commentText, postId : post.id, userId : id},
        })
    },[commentText , id])
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
                type="primary" htmlType="submit" loading={addCommentLoading}>댓글남기기</Button>
            </Form.Item>
        </Form>
    )
}

CommentForm.PropTypes ={
    post : PropTypes.object.isRequired
}

export default CommentForm