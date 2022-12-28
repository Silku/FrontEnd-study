import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import AppLayout from '../components/AppLayout'
import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList'
import { useDispatch, useSelector } from 'react-redux'
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST } from '../reducers/user'


export const followingList = '팔로잉 목록'
export const followerList = '팔로워 목록'

const Profile = () => {
	const dispatch = useDispatch();
	const {user} = useSelector((state) => state.user);
	const router = useRouter();

	useEffect(()=>{
		dispatch({
			type:LOAD_FOLLOWERS_REQUEST,
		})
		dispatch({
			type:LOAD_FOLLOWINGS_REQUEST,
		})
	},[])

	useEffect(()=>{
		if(!(user && user.id)){
			router.push('/')
		}
	},[user && user.id])
	


return (
	<>
		<Head>
			<title>My Profile | Next Board</title>
		</Head>
		<AppLayout>
			<NicknameEditForm/>
			<FollowList header={followingList} data={user?.Followings}/>
			<FollowList header={followerList} data={user?.Followers}/>
		</AppLayout>
	</>

)
}

export default Profile