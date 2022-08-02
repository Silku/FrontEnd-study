import { useEffect, useState } from 'react';
import styles from 	'./app.module.css';
import SearchHeader from './components/search_header/search_header';
import VideoList from './components/video_list/video_list';
import VideoDetail from './components/video_detail/video_detail';

function App({youtube}) {
	const [videos, setVideos] = useState([])
	const [selectedVideo, setSelectedVideo] = useState(null);

	const selectVideo = video =>{
		setSelectedVideo(video);
	};

	const search = query =>{
		youtube.search(query).then(videos => setVideos(videos));
	}

	useEffect(()=>{
	youtube.mostPopular().then(videos => setVideos(videos));

		// :: search값으로 query 받아오기 이전
		// const requestOptions = {
		// 	method: 'GET',
		// 	redirect: 'follow'
		// 	};
			
		// 	fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet&maxResults=20&regionCode=KR&chart=mostPopular&key=AIzaSyAmAA8pD07oj5RG0J3OURiqQvlz917W-Fk", requestOptions)
		// 	.then(response => response.json())
		// 	.then(result => setVideos(result.items))
		// 	.catch(error => console.log('error', error));
	},[])
	return (
		<div className={styles.app}>
			<SearchHeader onSearch={search}/>
			<section className={styles.content}>
				{selectedVideo && (
					<div className={styles.detail}>
						<VideoDetail video={selectedVideo}/>
					</div>
				)}
				<div className={styles.list}>
					<VideoList
						videos={videos}
						onVideoClick={selectVideo}
						display={selectedVideo ? 'list' : 'grid'}
					/>
				</div>
			</section>
			<VideoList videos={videos}/>
		</div>
	)
}



export default App;
