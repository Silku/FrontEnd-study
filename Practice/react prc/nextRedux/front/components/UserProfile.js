import React, {useCallback }from 'react'
import { Card ,Button ,Avatar} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {logoutRequsetAction} from '../reducers/user'

const UserProfile = () => {
    const dispatch = useDispatch();
    const {user, logOutLoading} = useSelector((state)=> state.user);

    const onLogOut = useCallback(() =>{
        dispatch(logoutRequsetAction())
        },[])
    
    return (
        <Card
            actions={[
                <div key="goodMark">좋아요<br/>{user.Posts.length}</div>,
                <div key="following">팔로잉<br/>{user.Followings.length}</div>,
                <div key="follower">팔로워<br/>{user.Followers.length}</div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{user.nickname[0]}</Avatar>}
                title={user.nickname}
            />
            <Button 
            style={{marginTop:'15px'}}
            onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
        </Card>
    )
}

export default UserProfile