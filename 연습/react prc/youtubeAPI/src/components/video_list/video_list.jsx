import React from "react";
import VideoItem from "../video_item/video_item";

const VideoList = props => (
    <ul>
        {props.videos.map(video => (
            <VideoItem video={video} key={video.id}/>
            //console key값에러 -> key값으로 id추가
        ))}
    </ul>
)


export default VideoList;