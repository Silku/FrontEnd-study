import React, { useCallback, useRef, useEffect } from 'react'
import { Form ,Input, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../reducers/post';
import useInput from '../hooks/useInput';


const PostForm = () => {
    const {imagePaths, addPostDone} = useSelector((state)=>state.post);
    const dispatch = useDispatch();

    // useInput => 커스텀훅
    const [text, onChangeText, setText] = useInput('')

    useEffect(()=>{
        if(addPostDone){
            setText(' ');
        }
    },[addPostDone])

    const onSubmit = useCallback(() =>{
        if(!text || !text.trim()){
            return alert('게시글을 작성하세요.');
        }
        const formData = new FormData()
        imagePaths.forEach((image)=>{
            formData.append('image', image);
        })
        formData.append('content', text)
        return dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
        })
    },[text, imagePaths])

    const imageInput = useRef();
    const onClickImageUpload = useCallback(() =>{   
        imageInput.current.click();
    },[imageInput.current])

    const onChangeImages = useCallback((e)=>{
        console.log('images', e.target.files);
        const imageFormData = new FormData(); //formData를 쓰면 multipart형식으로 보낼수 있고 multer가 처리가능
        [].forEach.call(e.target.files, (f)=>{
            imageFormData.append('imagefiles', f)
        })
        dispatch({
            type:UPLOAD_IMAGES_REQUEST,
            data:imageFormData,
        })
    },[])

    const onRemoveImage = useCallback((index) => () =>{
        dispatch({
            type:REMOVE_IMAGE,
            data:index,
        })
    },[])

  return (
    <>
        <Form style={{margin : '10px 0 20px' , }} encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea
                value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="게시글을 작성해 주세요."
                resize='none'
            />
            <div>
                <input 
                type='file' 
                multiple
                style={{display:'none'}}
                ref={imageInput}
                onChange={onChangeImages}/>
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type="primary" style={{float:'right'}} htmlType="submit">작성하기</Button>
            </div>
            <div>
                {imagePaths.map((v, i)=>
                    <div key={v} style={{display:'inline-block'}}>
                        <img src={`http://localhost:3065/${v}`} style={{width:'200px'}} alt={v}/>
                        <div>
                            <Button onClick={onRemoveImage(i)}>삭제</Button>
                        </div>
                    </div>
                )}
            </div>
        </Form>
    </>
  )
}

export default PostForm