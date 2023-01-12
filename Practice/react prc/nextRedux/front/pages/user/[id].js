import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import { END } from 'redux-saga';
import Head from 'next/head';
import { useRouter } from 'next/router';

import axios from 'axios';
import { LOAD_POSTS_REQUEST, LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST, LOAD_OTHER_USER_REQUEST } from '../../reducers/user';
import PostCard from '../../components/PostCard';
import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';

function User() {
	const dispatch = useDispatch();
	const router = useRouter();
	const { id } = router.query;
	const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
	const { otherUser, user } = useSelector((state) => state.user);

	useEffect(()=>{
		function onScroll(){
			let scrollY = window.scrollY 
			let clientHeight = document.documentElement.clientHeight
			let scrollHeight = document.documentElement.scrollHeight
			if(scrollY+ clientHeight >= scrollHeight -100){
				if(hasMorePosts && !loadPostsLoading){
					const lastId = mainPosts[mainPosts.length-1]?.id
					dispatch({
						type:LOAD_POSTS_REQUEST,
						lastId,
					})
				}
			}
		}
		window.addEventListener('scroll', onScroll)	
		return () =>{
			window.addEventListener('scroll', onScroll);
		}
	},[hasMorePosts, loadPostsLoading])

	return (
		<AppLayout>
		{otherUser && (
			<Head>
			<title>{otherUser.nickname}님의 글
			</title>
			<meta name="description" content={`${otherUser.nickname}님의 게시글`} />
			<meta property="og:title" content={`${otherUser.nickname}님의 게시글`} />
			<meta property="og:description" content={`${otherUser.nickname}님의 게시글`} />
			<meta property="og:image" content="https://nodebird.com/favicon.ico" />
			<meta property="og:url" content={`https://nodebird.com/user/${id}`} />
			</Head>
		)}
		{otherUser && (otherUser.id !== user?.id)
			? (
			<Card
				style={{ marginBottom: 20 }}
				actions={[
				<div key="twit">
					짹짹
					<br />
					{otherUser.Posts}
				</div>,
				<div key="following">
					팔로잉
					<br />
					{otherUser.Followings}
				</div>,
				<div key="follower">
					팔로워
					<br />
					{otherUser.Followers}
				</div>,
				]}
			>
				<Card.Meta
				avatar={<Avatar>{otherUser.nickname[0]}</Avatar>}
				title={otherUser.nickname}
				/>
			</Card>
			)
			: null}
		{mainPosts.map((c) => (
			<PostCard key={c.id} post={c} />
		))}
		{/* <div ref={hasMorePosts && !loadPostsLoading ? ref : undefined} style={{ height: 10 }} /> */}
		</AppLayout>
	);
	}

	export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
		const cookie = req ? req.headers.cookie : '';
		axios.defaults.headers.Cookie = '';
		if (req && cookie) {
			axios.defaults.headers.Cookie = cookie;
		}
		store.dispatch({
			type: LOAD_USER_POSTS_REQUEST,
			data: params.id,
		});
		store.dispatch({
			type: LOAD_MY_INFO_REQUEST,
		});
		store.dispatch({
			type: LOAD_OTHER_USER_REQUEST,
			data: params.id,
		});
		store.dispatch(END);
		await store.sagaTask.toPromise();
	});

export default User;