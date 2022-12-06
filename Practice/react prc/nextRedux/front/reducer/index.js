import { HYDRATE } from "next-redux-wrapper"

const initialState = {
    user:{
        isLogIn : false,
        user: null,
        signUpData : {},
        loginData : {},
    },
    post:{
        mainPosts:[],
    }
}

export const loginAction = (data) =>{
    return {
        type : 'LOG_IN',
        data,
    }
}
export const logoutAction = () =>{
    return {
        type : 'LOG_OUT',
    }
}

//async action creator

//action creator 예시
const changeNickname = (data) =>{
    return {
        type : 'CHANGE_NICKNAME',
        data
    }
}

// (이전state , action) => 다음state
const rootReducer = (state = initialState ,action) => {
    switch(action.type){
        case HYDRATE : 
        console.log('HYDRATE' , action)
            return {...state, ...action.payload}
        case 'LOG_IN' : 
            return {
                ...state,
                user:{
                    ...state.user,
                    isLogIn : true,
                    user : action.data, 
                }
            }
        case 'LOG_OUT' : 
        return {
            ...state,
            user:{
                ...state.user,
                isLogIn : false,
                user : null, 
            }
        }
        default : 
            return state;
    }
}

export default rootReducer;