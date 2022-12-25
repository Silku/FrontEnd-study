import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user'

const FollowButton = ({post}) => {
    const {user, followLoading, unfollowLoading} = useSelector((state)=> state.user)
    const dispatch = useDispatch();

    const isFollowing = user?.Followings.find((v)=> v.id === post.User.id)

    const onFollow = useCallback(()=>{
        if(isFollowing){
            dispatch({
                type:UNFOLLOW_REQUEST,
                data : post.User.id,
            })
        }else{
            dispatch({
                type:FOLLOW_REQUEST,
                data : post.User.id,
            })
        }
    },[isFollowing])

    // 게시물 작성자의 id가 본인id와 같으면 null, hooks위에 오면 에러나므로 hooks 아래에 있어야함. 
    if(post.User.id === user.id){
        return null
    }

    return (
        <Button loading={followLoading || unfollowLoading} onClick={onFollow}>
            {isFollowing ? '팔로우 취소' : '팔로우'}
        </Button>
    )
}


FollowButton.propTypes = {
    post:PropTypes.object.isRequired,
}

export default FollowButton