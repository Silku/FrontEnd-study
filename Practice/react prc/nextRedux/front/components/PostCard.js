import React, { useCallback , useState} from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button, Card, List, Popover } from 'antd'
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons'
import { Comment } from '@ant-design/compatible';
import { useDispatch, useSelector } from 'react-redux'

import PostImages from './PostImages'
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { 
            REMOVE_POST_REQUEST, 
            LIKE_POST_REQUEST,
            DISLIKE_POST_REQUEST, } from '../reducers/post';
import FollowButton from './FollowButton';

const PostCard = ({post}) => {
    const dispatch = useDispatch();
    const id = useSelector((state)=> state.user.user?.id);
    // optional chaining 연산자 : ?. 왼쪽이 null undefined면 오른쪽을 보여주지 않음
    const {removePostLoading} = useSelector((state) => state.post);

    const [commentFormOpened, setCommentFormOpened] = useState(false);


    const onLike = useCallback(()=>{
        dispatch({
            type:LIKE_POST_REQUEST,
            data:post.id,
        })
    },[id])
    const onDislike = useCallback(()=>{
        dispatch({
            type:DISLIKE_POST_REQUEST,
            data:post.id,
        })
    },[id])
    


    const onToggleComment = useCallback(()=>{
        setCommentFormOpened((prev) =>!prev);
    },[])

    const onRemovePost = useCallback(()=>{
        dispatch({
            type:REMOVE_POST_REQUEST,
            data : post.id,
        })
    },[])

    const liked = post.Likers.find((v) => v.id === id);
    return (
    <>
        <Card 
            style={{marginBottom:'10px'}}
            cover={post.Images[0] && <PostImages images={post.Images}/>}
            actions={[
                <RetweetOutlined key="reply"/>,
                liked
                ? <HeartTwoTone twoToneColor="red" key="heart" onClick={onDislike}/>
                : <HeartOutlined key="heart" onClick={onLike}/>,
                <MessageOutlined key="comment" onClick={onToggleComment}/>,
                <Popover key="more" content={(
                    <Button.Group>
                        {id && post.User.id === id 
                        ? (<>
                                <Button>수정</Button>
                                <Button danger loading={removePostLoading} onClick={onRemovePost}>삭제</Button> 
                            </>) 
                        : <Button>신고</Button>}

                    </Button.Group>
                )}>
                    <EllipsisOutlined/>
                </Popover>
            ]}
            extra={id && <FollowButton post={post}/>}
        >
            {/* <Image/> */}
            <Card.Meta
                avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                title={post.User.nickname}
                description={<PostCardContent postData={post.content}/>}
            />
        </Card>
        {commentFormOpened &&(
            <>
                <CommentForm post={post}/>
                <List 
                    style={{marginTop:'40px'}}
                    header={`${post.Comments.length}개의 댓글`}
                    itemLayout="horizontal"
                    dataSource={post.Comments}
                    renderItem={(item)=>(
                        <li>
                            <Comment 
                                author={item.User.nickname}
                                avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                content={item.content}
                            />
                        </li>
                    )}
                />
            </>
        )}
        {/* 
        <Comments/> */}
    </>
  )
}
PostCard.PropTypes ={
    // object안에 속성들 표기해주고싶다면 shape
    post : PropTypes.shape({
        id : PropTypes.number,
        User : PropTypes.object,
        Content : PropTypes.string,
        createdAt : PropTypes.string,
        Comments : PropTypes.arrayOf(PropTypes.object),
        Images : PropTypes.arrayOf(PropTypes.object), 
        Likers : PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
}

export default PostCard