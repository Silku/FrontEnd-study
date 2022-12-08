import React, { useCallback , useState} from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button, Card, Popover } from 'antd'
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import PostImages from './PostImages'

const PostCard = ({post}) => {
    const {user} = useSelector((state)=> state.user);
    // optional chaining 연산자 : ?. 왼쪽이 null undefined면 오른쪽을 보여주지 않음
    const id = user?.id;

    const [liked, setLiked] = useState(false);
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const onToggleLike = useCallback(()=>{
        setLiked((prev) =>!prev);
    },[])
    const onToggleComment = useCallback(()=>{
        setCommentFormOpened((prev) =>!prev);
    },[])

  return (
    <>
        <Card 
            style={{marginBottom:'10px'}}
            cover={post.Images[0] && <PostImages images={post.Images}/>}
            actions={[
                <RetweetOutlined key="reply"/>,
                liked
                ? <HeartTwoTone twoToneColor="red" key="heart" onClick={onToggleLike}/>
                : <HeartOutlined key="heart" onClick={onToggleLike}/>,
                <MessageOutlined key="comment" onClick={onToggleComment}/>,
                <Popover key="more" content={(
                    <Button.Group>
                        {id && post.User.id === id 
                        ? (<>
                                <Button>수정</Button>
                                <Button type="danger">삭제</Button> 
                            </>) 
                        : <Button>신고</Button>}

                    </Button.Group>
                )}>
                    <EllipsisOutlined/>
                </Popover>
            ]}
        >
            {/* <Image/> */}
            <Card.Meta
                avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                title={post.User.nickname}
                description={post.content}
            />
        </Card>
        {commentFormOpened &&(
            <div>댓글 열기 ....</div>
        )}
        {/* <CommentForm/>
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
        createdAt : PropTypes.object,
        Comments : PropTypes.arrayOf(PropTypes.object),
        Images : PropTypes.arrayOf(PropTypes.object) 
    }).isRequired,
}

export default PostCard