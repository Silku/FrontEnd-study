import axios from "axios";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";

import { 
    LOG_IN_REQUEST,  LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE, 
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, 
    FOLLOW_REQUEST,
    FOLLOW_SUCCESS,
    FOLLOW_FAILURE,
    UNFOLLOW_REQUEST,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_FAILURE,
    LOAD_MY_INFO_REQUEST,
    LOAD_MY_INFO_SUCCESS,
    LOAD_MY_INFO_FAILURE,
    CHANGE_NICKNAME_REQUEST,
    CHANGE_NICKNAME_FAILURE,
    CHANGE_NICKNAME_SUCCESS,
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWERS_SUCCESS,
    LOAD_FOLLOWERS_FAILURE,
    LOAD_FOLLOWINGS_REQUEST,
    LOAD_FOLLOWINGS_SUCCESS,
    LOAD_FOLLOWINGS_FAILURE,
    REMOVE_FOLLOWER_REQUEST,
    REMOVE_FOLLOWER_FAILURE,
    REMOVE_FOLLOWER_SUCCESS,
} from "../reducers/user";

function loginAPI(data){
    // 얘는 * 제네레이터 함수 아님 주의.
    return axios.post('/user/login',data)
}

// saga effect : call과 fork의 차이
// call은 동기, fork는 비동기 fork로 요청한다면 비동기로 처리되니까 요청만 보내버리고 다음줄이 실행되버림
function* logIn(action){
    try{
        const result = yield call(loginAPI, action.data)
        yield put({
            type:LOG_IN_SUCCESS,
            data: result.data,
        });
    }catch(err){
        yield put({
            type:LOG_IN_FAILURE,
            error: err.response.data
        })
    }
}

function logoutAPI(){
    return axios.post('/user/logout')
}

function* logOut(){
    try{
        yield call(logoutAPI)
        yield put({
            type:LOG_OUT_SUCCESS,
        })
    }catch(err){
        yield put({
            type:LOG_OUT_FAILURE,
            error:err.response.data,
        })
    }
}

function signUpAPI(data){
    return axios.post('/user', data)
}

function* signUp(action){
    try{
        const result = yield call(signUpAPI, action.data)
        console.log(result)
        // throw new Error('')   // 이런식으로 써주면 success 넘기고 에러로 바로 감
        yield put({
            type:SIGN_UP_SUCCESS,
            // data:result.data
        })
    }catch(err){
        yield put({
            type:SIGN_UP_FAILURE,
            error:err.response.data,
        })
    }
}

function followAPI(data){
    return axios.patch(`/user/${data}/follow`)
}

function* follow(action){
    try{
        const result = yield call(followAPI, action.data)
        yield put({
            type:FOLLOW_SUCCESS,
            data:result.data
        })
    }catch(err){
        yield put({
            type:FOLLOW_FAILURE,
            error:err.response.data,
        })
    }
}

function unfollowAPI(data){
    return axios.delete(`/user/${data}/follow`)
}

function* unfollow(action){
    try{
        const result = yield call(unfollowAPI, action.data)
        yield put({
            type:UNFOLLOW_SUCCESS,
            data:result.data
        })
    }catch(err){
        yield put({
            type:UNFOLLOW_FAILURE,
            error:err.response.data,
        })
    }
}

function loadMyInfoAPI(){
    return axios.get('/user')
}

function* loadMyInfo(action){
    try{
        const result = yield call(loadMyInfoAPI, action.data)
        yield put({
            type:LOAD_MY_INFO_SUCCESS,
            data:result.data
        })
    }catch(err){
        yield put({
            type:LOAD_MY_INFO_FAILURE,
            error:err.response.data,
        })
    }
}

function changeNicknameAPI(data){
    return axios.patch('/user/nickname', {nickname:data})
}

function* changeNickname(action){
    try{
        const result = yield call(changeNicknameAPI, action.data)
        yield put({
            type:CHANGE_NICKNAME_SUCCESS,
            data:result.data
        })
    }catch(err){
        yield put({
            type:CHANGE_NICKNAME_FAILURE,
            error:err.response.data,
        })
    }
}

function loadFollowersAPI(data){
    return axios.get('/user/followers',data)
}

function*  loadFollowers(action){
    try{
        const result = yield call(loadFollowersAPI, action.data)
        yield put({
            type:LOAD_FOLLOWERS_SUCCESS,
            data:result.data
        })
    }catch(err){
        yield put({
            type:LOAD_FOLLOWERS_FAILURE,
            error:err.response.data,
        })
    }
}

function loadFollowingsAPI(data){
    return axios.get('/user/followings',data)
}

function* loadFollowings(action){
    try{
        const result = yield call(loadFollowingsAPI, action.data)
        yield put({
            type: LOAD_FOLLOWINGS_SUCCESS,
            data:result.data
        })
    }catch(err){
        yield put({
            type:LOAD_FOLLOWINGS_FAILURE,
            error:err.response.data,
        })
    }
}

function removeFollowerAPI(data){
    return axios.delete(`/user/follower/${data}`)
}

function* removeFollower(action){
    try{
        const result = yield call(removeFollowerAPI, action.data)
        yield put({
            type: REMOVE_FOLLOWER_SUCCESS,
            data:result.data
        })
    }catch(err){
        yield put({
            type:REMOVE_FOLLOWER_FAILURE,
            error:err.response.data,
        })
    }
}


function* watchLogIn(){
    yield takeLatest(LOG_IN_REQUEST, logIn)
}
function* watchLogOut(){
    yield takeLatest(LOG_OUT_REQUEST, logOut)
}

function* watchSignUp(){
    yield takeLatest(SIGN_UP_REQUEST, signUp)
}

function* watchFollow(){
    yield takeLatest(FOLLOW_REQUEST, follow)
}
function* watchUnfollow(){
    yield takeLatest(UNFOLLOW_REQUEST, unfollow)
}
function* watchLoadMyInfo(){
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo)
}
function* watchChangeNickname(){
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname)
}
function* watchLoadFollowers(){
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers)
}
function* watchLoadFollowings(){
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings)
}
function* watchRemoveFollwer(){
    yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower)
}

export default function* userSaga(){
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLoadMyInfo),
        fork(watchChangeNickname),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchRemoveFollwer),
    ])
}


