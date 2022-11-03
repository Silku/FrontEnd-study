import React from "react";
import styles from './video_detail.module.css'

const VideoDetail = ({video, video:{snippet}}) =>(
    // myError : return 부분을 ()이 아닌 {} 처리해서 고통먹음.

        <section className={styles.detail}>
        {/* iframe 영상 나오는 화면 */}
        <iframe title="VideoDetail"
            className={styles.video}
            type="text/html"
            width="100%"
            height="500px"
            src={`https://www.youtube.com/embed/${video.id}`}
            frameborder="0"
            allow="fullscreen"
        ></iframe>
        {/* myError : allowFullScreens  --> allow="fullscreen" 
                https://developer.mozilla.org/ko/docs/Web/HTML/Element/iframe
        */}
        <h2>{snippet.title}</h2>
        <h3>{snippet.channelTitle}</h3>
        {/* pre태그 : 안에 있는 텍스트를 그대로 출력 해주게 해줌, 태그 등도 그대로 나옴 */}
        <pre className={styles.description}>{snippet.description}</pre>
    </section>

);

export default VideoDetail;