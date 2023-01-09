import { HYDRATE } from "next-redux-wrapper"
import { combineReducers } from "redux"
// combineReducers : 분할된 reducer를 합쳐주는 역할

import user from './user'
import post from './post'

// backend서버 url


//async action creator

//action creator 예시
const changeNickname = (data) =>{
    return {
        type : 'CHANGE_NICKNAME',
        data
    }
}



// (이전state , action) => 다음state
const rootReducer = (state, action) => {
    switch (action.type) {
        case HYDRATE:
            console.log('HYDRATE', action);
            return action.payload;
        default: {
            const combinedReducer = combineReducers({
                user,
                post,
            });
            return combinedReducer(state, action);
        }
    }
};

export default rootReducer;