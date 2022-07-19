import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import YouTube from './service/youtube';

const youtube = new YouTube(process.env.REACT_APP_YOUTUBE_API_KEY)
//node의 process 객체.env에 접근

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App youtube={youtube}/>
  </React.StrictMode>
);
