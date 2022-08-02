import React from "react";
import VideoItem from "../video_item/video_item";
import styles from './video_list.module.css'

const VideoList = ({videos, onVideoClick, display}) => (
    <ul className={styles.videos}>
        {videos.map(video => (
            <VideoItem 
            key={video.id}
            video={video} 
            onVideoClick={onVideoClick}
            display={display}
            />
            //console key값에러 -> key값으로 id추가
        ))}
    </ul>
)


export default VideoList;   