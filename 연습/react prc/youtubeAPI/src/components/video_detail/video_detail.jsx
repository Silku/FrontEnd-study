import React from "react";
import styles from './video_detail.module.css'

const VideoDetail = ({video, video:{snippet}}) =>{
    <section className={styles.detail}>
        <iframe title="VideoDetail"
            className={styles.video}
            type="text/html"
            width="100%"
            height="500px"
            src={`https://www.youtube.com/embed/${video.id}`}
            frameborder="0"
            allowFullScreens
        ></iframe>
        {/* iframe 영상 나오는 화면 */}
        <h2>{snippet.title}</h2>
        <h3>{snippet.channelTitle}</h3>
        <pre className={styles.description}>{snippet.description}</pre>
    </section>
};

export default VideoDetail;