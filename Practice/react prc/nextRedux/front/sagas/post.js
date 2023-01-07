import axios from 'axios'
// import shortid from "shortid";
import { all, call, delay, fork, put, takeLatest, throttle } from "redux-saga/effects";

import {
    ADD_COMMENT_REQUEST ,
    ADD_COMMENT_SUCCESS, 
    ADD_COMMENT_FAILURE,
    ADD_POST_REQUEST, 
    ADD_POST_SUCCESS ,
    ADD_POST_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    REMOVE_POST_FAILURE,
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS,
    LOAD_POSTS_FAILURE,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAILURE,
    DISLIKE_POST_REQUEST,
    DISLIKE_POST_SUCCESS,
    DISLIKE_POST_FAILURE,
    UPLOAD_IMAGES_REQUEST,
    UPLOAD_IMAGES_SUCCESS,
    UPLOAD_IMAGES_FAILURE,
    RETWEET_REQUEST,
    RETWEET_SUCCESS,
    RETWEET_FAILURE,
    LOAD_POST_REQUEST,
    LOAD_POST_SUCCESS,
    LOAD_POST_FAILURE,
    LOAD_HASHTAG_POSTS_REQUEST,
    LOAD_USER_POSTS_REQUEST,
    LOAD_HASHTAG_POSTS_SUCCESS,
    LOAD_HASHTAG_POSTS_FAILURE,
    LOAD_USER_POSTS_SUCCESS,
    LOAD_USER_POSTS_FAILURE,
    // generateDummyPost, 
} from "../reducers/post";
import { ADD_POST_TO_MINE, REMOVE_POST_OF_MINE } from "../reducers/user";


function loadPostAPI(data){
    return axios.get(`/posts/${data}`)
}

function* loadPost(action){
    try{
        const result = yield call(loadPostAPI, action.data)
        yield put({
            type:LOAD_POST_SUCCESS,
            data: result.data,
        })
    }catch(err){
        yield put({
            type:LOAD_POST_FAILURE,
            error:err.response.data
        })
    }
}


function loadPostsAPI(lastId){
    // 쿼리스트링 방식 , 주소에 데이터를 포함
    return axios.get(`/posts?lastId=${lastId || 0}`)
}

function* loadPosts(action){
    try{
        const result = yield call(loadPostsAPI, action.data)
        yield put({
            type:LOAD_POSTS_SUCCESS,
            data: result.data,
        })
    }catch(err){
        yield put({
            type:LOAD_POSTS_FAILURE,
            error:err.response.data
        })
    }
}

function loadHashtagPostsAPI(data, lastId) {
    return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`);
}

function* loadHashtagPosts(action) {
    try {
    console.log('loadHashtag console');
    const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
    yield put({
        type: LOAD_HASHTAG_POSTS_SUCCESS,
        data: result.data,
    });
    } catch (err) {
    console.error(err);
    yield put({
        type: LOAD_HASHTAG_POSTS_FAILURE,
        error: err.response.data,
    });
    }
}

function loadUserPostsAPI(data, lastId) {
    return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`);
}

function* loadUserPosts(action) {
    try {
    const result = yield call(loadUserPostsAPI, action.data, action.lastId);
    yield put({
        type: LOAD_USER_POSTS_SUCCESS,
        data: result.data,
    });
    } catch (err) {
    console.error(err);
    yield put({
        type: LOAD_USER_POSTS_FAILURE,
        error: err.response.data,
    });
    }
}


function addPostAPI(data){
    return axios.post('/post', data)
}

function* addPost(action){
    try{
        const result = yield call(addPostAPI, action.data)
        yield put({
            type:ADD_POST_SUCCESS,
            data: result.data,
        })
        yield put({
            type:ADD_POST_TO_MINE,
            data:result.data.id,
        })
    }catch(err){
        yield put({
            type:ADD_POST_FAILURE,
            error:err.response.data
        })
    }
}

function removePostAPI(data){
    return axios.delete(`/post/${data}`)
}

function* removePost(action){
    try{
        const result = yield call(removePostAPI, action.data)
        yield put({
            type:REMOVE_POST_SUCCESS,
            data: result.data,
        })
        yield put({
            type:REMOVE_POST_OF_MINE,
            data: action.data
        })
    }catch(err){
        console.log(err)
        yield put({
            type:REMOVE_POST_FAILURE,
            error:err.response.data
        })
    }
}

function likePostAPI(data){
    return axios.patch(`/post/${data}/like`)
}

function* likePost(action){
    try{
        const result = yield call(likePostAPI, action.data)
        yield put({
            type:LIKE_POST_SUCCESS,
            data:result.data,
        })
    }catch(err){
        console.error(err)
        yield put({
            type:LIKE_POST_FAILURE,
            error:err.response.data
        })
    }
}

function dislikePostAPI(data){
    return axios.delete(`/post/${data}/like`)
}

function* dislikePost(action){
    try{
        const result = yield call(dislikePostAPI, action.data)
        yield put({
            type:DISLIKE_POST_SUCCESS,
            data:result.data,
        })
    }catch(err){
        console.error(err)
        yield put({
            type:DISLIKE_POST_FAILURE,
            error:err.response.data
        })
    }
}


function addCommentAPI(data){
    return axios.post(`/post/${data.postId}/comment`,data)
}

function* addComment(action){
    try{
        const result = yield call(addCommentAPI, action.data)
        yield put({
            type:ADD_COMMENT_SUCCESS,
            data:result.data,
        })
    }catch(err){
        console.error(err)
        yield put({
            type:ADD_COMMENT_FAILURE,
            error:err.response.data
        })
    }
}

function uploadImagesAPI(data){
    return axios.post('post/images',data)
}

function* uploadImages(action){
    try{
        const result = yield call(uploadImagesAPI, action.data)
        yield put({
            type:UPLOAD_IMAGES_SUCCESS,
            data:result.data,
        })
    }catch(err){
        console.error(err)
        yield put({
            type:UPLOAD_IMAGES_FAILURE,
            error:err.response.data
        })
    }
}

function retweetAPI(data){
    return axios.post(`post/${data}/retweet`)
}

function* retweet(action){
    try{
        const result = yield call(retweetAPI, action.data)
        yield put({
            type:RETWEET_SUCCESS,
            data:result.data,
        })
    }catch(err){
        console.error(err)
        yield put({
            type:RETWEET_FAILURE,
            error:err.response.data
        })
    }
}



function* watchLoadPost(){
    yield takeLatest(LOAD_POST_REQUEST, loadPost)
}
function* watchLoadPosts(){
    yield takeLatest(LOAD_POSTS_REQUEST, loadPosts)
}

function* watchLoadHashtagPosts() {
    yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

function* watchLoadUserPosts() {
    yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost)
}

function* watchRemovePost(){
    yield takeLatest(REMOVE_POST_REQUEST, removePost)
}

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

function* watchLikePost(){
    yield takeLatest(LIKE_POST_REQUEST, likePost)
}
function* watchDislikePost(){
    yield takeLatest(DISLIKE_POST_REQUEST, dislikePost)
}
function* watchUploadImages(){
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages)
}
function* watchRetweet(){
    yield takeLatest(RETWEET_REQUEST, retweet)
}

export default function* postSaga(){
    yield all([
        fork(watchRetweet),
        fork(watchUploadImages),
        fork(watchLoadPost),
        fork(watchLoadPosts),
        fork(watchLoadUserPosts),
        fork(watchLoadHashtagPosts),
        fork(watchAddPost),
        fork(watchLikePost),
        fork(watchDislikePost),
        fork(watchRemovePost),
        fork(watchAddComment),
    ])
}

