import { HYDRATE } from "next-redux-wrapper"
import { combineReducers } from "redux"
// combineReducers : 분할된 reducer를 합쳐주는 역할

import user from './user'
import post from './post'

// backend서버 url
export const baseUrl = 'http://localhost:3065'


//async action creator

//action creator 예시
const changeNickname = (data) =>{
    return {
        type : 'CHANGE_NICKNAME',
        data
    }
}



// (이전state , action) => 다음state
const rootReducer = combineReducers({
    // combineReducer쓰면 HYDRATE는 아래와 같이 넣어줌.
    index : (state={}, action) => {
        switch(action.type){
            case HYDRATE : 
            console.log('HYDRATE' , action)
                return {...state, ...action.payload}
            default : 
                return state;
        }
    },
    user,
    post,
})

export default rootReducer;