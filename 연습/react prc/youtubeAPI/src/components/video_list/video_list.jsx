import React from "react";
import VideoItem from "../video_item/video_item";
import styles from './video_list.module.css'
const VideoList = props => (
    <ul className={styles.videos}>
        {props.videos.map(video => (
            <VideoItem video={video} key={video.id}/>
            //console key값에러 -> key값으로 id추가
        ))}
    </ul>
)


export default VideoList;