import React from 'react'
import Head from 'next/head'
import AppLayout from '../components/AppLayout'
import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList'
import { useSelector } from 'react-redux'


const Profile = () => {
	const {user} = useSelector((state) => state.user);

return (
	<>
		<Head>
			<title>My Profile | Next Board</title>
		</Head>
		<AppLayout>
			<NicknameEditForm/>
			<FollowList header="팔로잉 목록" data={user.Followings}/>
			<FollowList header="팔로워 목록" data={user.Followers}/>
		</AppLayout>
	</>

)
}

export default Profile