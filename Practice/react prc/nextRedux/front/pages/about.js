import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { END } from 'redux-saga';

import { Avatar, Card } from 'antd';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';
import { LOAD_OTHER_USER_REQUEST } from '../reducers/user';

const About = () => {

	const { otherUser } = useSelector((state) => state.user);

	return (
		<AppLayout>
		<Head>
			<title> TWKIM | NextBoard</title>
		</Head>
        ㅋㅋ
		{otherUser
			? (
			<Card
				actions={[
				<div key="twit">
					게시글 공유
					<br />
					{otherUser.Posts.length}
				</div>,
				<div key="following">
					팔로잉
					<br />
					{otherUser.Followings.length}
				</div>,
				<div key="follower">
					팔로워
					<br />
					{otherUser.Followers.length}
				</div>,
				]}
			>
				<Card.Meta
				avatar={<Avatar>{otherUser.nickname[0]}</Avatar>}
				title={otherUser.nickname}
				description="관리자 계정임"
				/>
			</Card>
			)
			: null}
		</AppLayout>
	);
};

export const getStaticProps = wrapper.getStaticProps(async (context) => {
    console.log('getStaticProps');
    context.store.dispatch({
		type: LOAD_OTHER_USER_REQUEST,
		data: 2,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default About;