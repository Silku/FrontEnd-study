import {all,fork}from 'redux-saga/effects'


import userSaga from './user'
import postSaga from './post'

export default function* rootSaga(){
    yield all([ // all은 동시에 실행하게해줌
        //fork, 또는 call로 generator함수를 실행해줌. 둘은 분명한 차이가 있음.
        fork(userSaga),
        fork(postSaga),
    ])
}