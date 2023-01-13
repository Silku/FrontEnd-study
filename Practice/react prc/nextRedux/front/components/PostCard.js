import React, { useCallback , useEffect, useState} from 'react'
import propTypes from 'prop-types'
import { Avatar, Button, Card, List, Popover } from 'antd'
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons'
import { Comment } from '@ant-design/compatible';
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link';
import moment from 'moment'

import PostImages from './PostImages'
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { 
            REMOVE_POST_REQUEST, 
            LIKE_POST_REQUEST,
            DISLIKE_POST_REQUEST,
            RETWEET_REQUEST,
            } from '../reducers/post';
import FollowButton from './FollowButton';

moment.locale('ko')


const PostCard = ({post}) => {
    const dispatch = useDispatch();
    const id = useSelector((state)=> state.user.user?.id);
    // optional chaining 연산자 : ?. 왼쪽이 null undefined면 오른쪽을 보여주지 않음
    const {removePostLoading} = useSelector((state) => state.post);

    const [commentFormOpened, setCommentFormOpened] = useState(false);


    const onLike = useCallback(()=>{
        if(!id){
            return alert('로그인이 필요합니다.')
        }
        return dispatch({
            type:LIKE_POST_REQUEST,
            data:post.id,
        })
    },[id])
    const onDislike = useCallback(()=>{
        if(!id){
            return alert('로그인이 필요합니다.')
        }
        return dispatch({
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

    const onRetweet = useCallback(() =>{
        if(!id){
            return alert('로그인이 필요합니다.')
        }
        return dispatch({
            type:RETWEET_REQUEST,
            data:post.id,
        })
    },[id])

    const liked = post.Likers.find((v) => v.id === id);


    return (
    <>
        <Card 
            style={{marginBottom:'10px'}}
            cover={post.Images[0] && <PostImages images={post.Images}/>}
            actions={[
                <RetweetOutlined key="retweet" onClick={onRetweet}/>,
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
            title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다` : null}
            extra={id && <FollowButton post={post}/>}
        >
            {/* <Image/> */}
            {post.RetweetId && post.Retweet
            ? (
                <Card
                cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images}/>}
                >
                <div style={{float:'right'}}>{moment(post.createdAt, 'YYYYMMDD').fromNow()}</div>
                <Card.Meta
                avatar={<Link href={`/user/${post.Retweet.User.id}`}>
                                <a><Avatar>{post.Retweet.User.nickname[0]}</Avatar></a>
                            </Link>}
                title={post.Retweet.User.nickname}
                description={<PostCardContent postData={post.Retweet.content}/>}
                />
                </Card>
            )
            :(
                <>
                    <div style={{float:'right'}}>{moment(post.createdAt, 'YYYYMMDD').fromNow()}</div>
                    <Card.Meta
                    avatar={
                        <Link href={`/user/${post.User.id}`}>
                            <a><Avatar>{post.User.nickname[0]}</Avatar></a>
                        </Link>   
                    }
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.content}/>}
                    />
                </>
            )}
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
                                avatar={
                                <Link href={`/user/${item.User.id}`}>
                                    <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                                </Link>}
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
PostCard.propTypes ={
    // object안에 속성들 표기해주고싶다면 shape
    post : propTypes.shape({
        id : propTypes.number,
        User : propTypes.object,
        Content : propTypes.string,
        createdAt : propTypes.string,
        Comments : propTypes.arrayOf(propTypes.object),
        Images : propTypes.arrayOf(propTypes.object), 
        Likers : propTypes.arrayOf(propTypes.object),
        RetweetId: propTypes.number,
        Retweet: propTypes.objectOf(propTypes.any),
    }).isRequired,
}

export default PostCard