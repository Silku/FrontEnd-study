import { useEffect, useState } from 'react';
import './app.css';
import VideoList from './components/video_list/video_list';

function App() {
	const [videos, setVideos] = useState([])
	useEffect(()=>{
		const requestOptions = {
			method: 'GET',
			redirect: 'follow'
			};
			
			fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet&maxResult=20&chart=mostPopular&key=AIzaSyAmAA8pD07oj5RG0J3OURiqQvlz917W-Fk", requestOptions)
			.then(response => response.json())
			.then(result => setVideos(result.items))
			.catch(error => console.log('error', error));
	},[])
	return (
		<VideoList videos={videos}/>
	)
}

export default App;
