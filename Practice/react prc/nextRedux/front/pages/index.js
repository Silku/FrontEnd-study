import { useDispatch, useSelector } from "react-redux"
import AppLayout from "../components/AppLayout"
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST, } from "../reducers/user";
import { useEffect } from "react";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";

const Home = () => {

	const dispatch = useDispatch();
	const {user} = useSelector((state) => state.user);
	const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useSelector((state) => state.post);

	useEffect(()=>{
		if(retweetError){
			alert(retweetError)
		}
	},[retweetError])

	useEffect(() => {
			dispatch({
				type: LOAD_MY_INFO_REQUEST,
			});
			dispatch({
				type: LOAD_POSTS_REQUEST,
			});
		},[]);

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


	// map함수에 들어가는 key는 게시물이 지워지거나 하면 삭제될 가능성이 있다거나 변동될 수 있으므로 항상 고유값을 넣어준다.
	return (
		<AppLayout>
			{user &&<PostForm/>}
			{mainPosts.map((post) => <PostCard key={post.id} post={post}/>)}
		</AppLayout>
	)
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
	const cookie = req ? req.headers.cookie : '';
	axios.defaults.headers.Cookie = '';
	if (req && cookie) {
		axios.defaults.headers.Cookie = cookie;
	}
	store.dispatch({
		type: LOAD_MY_INFO_REQUEST,
	});
	store.dispatch({
		type: LOAD_POSTS_REQUEST,
	});
	store.dispatch(END);	
	await store.sagaTask.toPromise();
});

export default Home