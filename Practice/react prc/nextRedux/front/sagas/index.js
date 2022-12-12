import {all, call, fork, take, put, takeEvery, takeLatest }from 'redux-saga/effects'

import axios from 'axios'

function loginAPI(data){
    // 얘는 * 아님 주의.
    return axios.post('/api/login',data)
}

// saga effect : call과 fork의 차이
// call은 동기, fork는 비동기 fork로 요청한다면 비동기로 처리되니까 요청만 보내버리고 다음줄이 실행되버림
function* login(action){
    try{
        const result = yield call(loginAPI, action.data)
        yield put({
            type:'LOGIN_SUCCESS',
            data:result.data
        })
    }catch(err){
        yield put({
            type:'LOGIN_FAILURE',
            data:err.response.data
        })
    }
}

function logoutAPI(){
    return axios.post('/api/logout')
}

function* logout(){
    try{
        const result = yield call(logoutAPI)
        yield put({
            type:'LOGOUT_SUCCESS',
            data:result.data
        })
    }catch(err){
        yield put({
            type:'LOGOUT_FAILURE',
            data:err.response.data
        })
    }
}

function addPostAPI(data){
    return axios.post('/api/post',data)
}

function* addPost(action){
    try{
        const result = yield call(addPostAPI, action.data)
        yield put({
            type:'ADD_POST_SUCCESS',
            data:result.data
        })
    }catch(err){
        yield put({
            type:'ADD_POST_FAILURE',
            data:err.response.data
        })
    }
}

function* watchLogIn(){
    yield takeLatest('LOG_IN_REQUEST', login)
}
function* watchLogOut(){
    yield takeLatest('LOG_OUT_REQUEST', logout)
}
function* watchAddPost(){
    yield takeLatest('ADD_POST_REQUEST', addPost)
}



export default function* rootSaga(){
    yield all([ // all은 동시에 실행하게해줌
        //fork, 또는 call로 generator함수를 실행해줌. 둘은 분명한 차이가 있음.
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchAddPost),
    ])
}