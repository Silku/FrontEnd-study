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
    UNFOLLOW_FAILURE
} from "../reducers/user";

function loginAPI(data){
    // 얘는 * 제네레이터 함수 아님 주의.
    return axios.post('/user/login',data)
}

// saga effect : call과 fork의 차이
// call은 동기, fork는 비동기 fork로 요청한다면 비동기로 처리되니까 요청만 보내버리고 다음줄이 실행되버림
function* logIn(action){
    console.log('saga 로그인요청')
    try{
        const result = yield call(loginAPI, action.data)
        console.log('로그인data : ' + result)
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

function followAPI(){
    return axios.post('/api/follow')
}

function* follow(action){
    try{
        yield delay(500)
        // const result = yield call(followAPI)
        yield put({
            type:FOLLOW_SUCCESS,
            data:action.data
        })
    }catch(err){
        yield put({
            type:FOLLOW_FAILURE,
            error:err.response.data,
        })
    }
}

function unfollowAPI(){
    return axios.post('/api/unfollow')
}

function* unfollow(action){
    try{
        yield delay(500)
        // const result = yield call(unfollowAPI)
        yield put({
            type:UNFOLLOW_SUCCESS,
            data:action.data
        })
    }catch(err){
        yield put({
            type:UNFOLLOW_FAILURE,
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

export default function* userSaga(){
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnfollow)
    ])
}


