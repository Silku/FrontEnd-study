import React from 'react'
import Head from 'next/head'
import AppLayout from '../components/AppLayout'
import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList'


const Profile = () => {
	const followingList=[{nickname:'사과'},{nickname:'딸기'},{nickname:'자몽'}]
	const follwerList=[{nickname:'치킨', age:24},{nickname:'피자'},{nickname:'햄버거'}]

return (
	<>
		<Head>
			<title>My Profile | Next Board</title>
		</Head>
		<AppLayout>
			<NicknameEditForm/>
			<FollowList header="팔로잉 목록" data={followingList}/>
			<FollowList header="팔로워 목록" data={follwerList}/>
		</AppLayout>
	</>

)
}

export default Profile