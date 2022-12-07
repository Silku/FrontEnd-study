import { useSelector } from "react-redux"
import AppLayout from "../components/AppLayout"
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
	const {isLogIn} = useSelector((state) => state.user);
	const {mainPosts} = useSelector((state) => state.post);

	// map함수에 들어가는 key는 게시물이 지워지거나 하면 삭제될 가능성이 있다거나 변동될 수 있으므로 항상 고유값을 넣어준다.
	return (
		<AppLayout>
			<img width="100%" src='https://cdn.pixabay.com/photo/2017/11/06/08/45/greeting-card-2923054__340.jpg'></img>
			{isLogIn &&<PostForm/>}
			{mainPosts.map((post, index) => <PostCard key={post.id} post={post}/>)}
		</AppLayout>
	)
}

export default Home