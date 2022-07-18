import React from "react";
import styles from './video_item.module.css'

const VideoItem = props  => <h1>{props.video.snippet.title}</h1>;


export default VideoItem;