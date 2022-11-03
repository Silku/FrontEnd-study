import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import YouTube from './service/youtube';
import axios from 'axios';

// axois 스타일
const  httpClient = axios.create({
  baseURL:'https://youtube.googleapis.com/youtube/v3',
  params: {key : process.env.REACT_APP_YOUTUBE_API_KEY},
});

const youtube = new YouTube(httpClient);

// fetch 스타일
// const youtube = new YouTube(process.env.REACT_APP_YOUTUBE_API_KEY)
//node의 process 객체.env에 접근

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App youtube={youtube}/>
  </React.StrictMode>
);
