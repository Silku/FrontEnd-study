import React, {useCallback }from 'react'
import { Card ,Button ,Avatar} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {logoutRequsetAction} from '../reducers/user'
import Link from 'next/link'

const UserProfile = () => {
    const dispatch = useDispatch();
    const {user, logOutLoading} = useSelector((state)=> state.user);

    const onLogOut = useCallback(() =>{
        dispatch(logoutRequsetAction())
        },[])
    
    return (
        <Card
            actions={[
                <div key="goodMark">게시물<br/>{user.Posts.length}</div>,
                <div key="following">팔로잉<br/>{user.Followings.length}</div>,
                <div key="follower">팔로워<br/>{user.Followers.length}</div>,
            ]}
        >
            <Card.Meta
                avatar={
                <Link href={`/user/${user.id}`}>
                    <a><Avatar>{user.nickname[0]}</Avatar></a>
                </Link>}
                title={user.nickname}
            />
            <Button 
            style={{marginTop:'15px'}}
            onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
        </Card>
    )
}

export default UserProfile