import produce from 'immer'

export const initialState = {
    logInLoading: false, // 로그인 시도중
    logInDone: false,
    logInError: null,
    logOutLoading: false, // 로그아웃 시도중
    logOutDone: false,
    logOutError: null,
    signUpLoading: false, // 회원가입 시도중
    signUpDone: false,
    signUpError: null,
    followLoading: false, // 팔로우 시도중
    followDone: false,
    followError: null, 
    unfollowLoading: false, // 언팔로우 시도중
    unfollowDone: false,
    unfollowError: null,
    changeNicknameLoading: false, // 닉네임 변경 시도중
    changeNicknameDone: false,
    changeNicknameError: null,
    loadMyInfoLoading: false, // 유저정보 가져오기 시도중
    loadMyInfoDone: false,
    loadMyInfoError: null,
    user: null,
    signUpData : {},
    loginData : {},
}

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST'
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS'
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE'

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST'
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS'
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE'

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST'
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS'
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE'

export const ADD_POST_TO_MINE = 'ADD_POST_TO_MINE';
export const REMOVE_POST_OF_MINE = 'REMOVE_POST_OF_MINE';



const dummyUser = (data) =>({
    ...data,
    nickname:'Silku',
    id : 1,
    Posts:[],
    Followings : [{nickname:'바보'},{nickname:'바보'},{nickname:'바보'}],
    Followers: [{nickname:'바보'},{nickname:'바보'},{nickname:'바보'}],
})


export const loginRequestAction = (data) =>{
    return {
        type: LOG_IN_REQUEST,
        data,

    }
}

export const logoutRequsetAction =() =>{
    return {
        type: LOG_OUT_REQUEST,
    }
}

const reducer = (state = initialState, action) => produce(state, (draft) => {
     // reducer 분할 이전보다 depth가 낮아져서 한 단계 빼줌
    switch(action.type){
        case LOAD_MY_INFO_REQUEST:
            draft.loadMyInfoLoading = true;
            draft.loadMyInfoError = null;
            draft.loadMyInfoDone = false;
            break;
        case LOAD_MY_INFO_SUCCESS:
            draft.loadMyInfoLoading = false;
            draft.user = action.data;
            draft.loadMyInfoDone = true;
            break;
        case LOAD_MY_INFO_FAILURE:
            draft.loadMyInfoLoading = false;
            draft.loadMyInfoError = action.error;
            break;
        case LOG_IN_REQUEST:
            draft.logInLoading = true;
            draft.logInError = null;
            draft.logInDone = false;
            break;
        case LOG_IN_SUCCESS:
            draft.logInLoading = false;
            draft.user = action.data;
            draft.logInDone = true;
            break;
        case LOG_IN_FAILURE:
            draft.logInLoading = false;
            draft.logInError = action.error;
            break;
        case LOG_OUT_REQUEST:
            draft.logOutLoading = true;
            draft.logOutError = null;
            draft.logOutDone = false;
            break;
        case LOG_OUT_SUCCESS:
            draft.logOutLoading = false;
            draft.logOutDone = true;
            draft.user = null;
            break;
        case LOG_OUT_FAILURE:
            draft.logOutLoading = false;
            draft.logOutError = action.error;
            break;
        case SIGN_UP_REQUEST:
            draft.signUpLoading = true;
            draft.signUpError = null;
            draft.signUpDone = false;
            break;
        case SIGN_UP_SUCCESS:
            draft.signUpLoading = false;
            draft.signUpDone = true;
            break;
        case SIGN_UP_FAILURE:
            draft.signUpLoading = false;
            draft.signUpError = action.error;
            break;
        case CHANGE_NICKNAME_REQUEST:
            draft.changeNicknameLoading = true;
            draft.changeNicknameError = null;
            draft.changeNicknameDone = false;
            break;
        case CHANGE_NICKNAME_SUCCESS:
            draft.user.nickname = action.data.nickname;
            draft.changeNicknameLoading = false;
            draft.changeNicknameDone = true;
            break;
        case CHANGE_NICKNAME_FAILURE:
            draft.changeNicknameLoading = false;
            draft.changeNicknameError = action.error;
            break;
        case ADD_POST_TO_MINE : 
            draft.user.Posts.unshift({id:action.data})
            break;
            // return {
            //     ...state,
            //     user : {
            //         ...state.user,
            //         Posts : [{id:action.data}, ...state.user.Posts]
            //     },
            // }
        case REMOVE_POST_OF_MINE : 
            draft.user.Posts.filter((v) => v.id !== action.data)
            break;
        // return {
        //     ...state,
        //     user : {
        //         ...state.user,
        //         Posts : state.user.Posts.filter((v) => v.id !== action.data)
        //     },
        // }
        case FOLLOW_REQUEST:
            draft.followLoading = true;
            draft.followError = null;
            draft.followDone = false;
            break;
        case FOLLOW_SUCCESS:
            draft.followLoading = false;
            draft.user.Followings.push({id : action.data});
            draft.followDone = true;
            break;
        case FOLLOW_FAILURE:
            draft.followLoading = false;
            draft.followError = action.error;
            break;
        case UNFOLLOW_REQUEST:
            draft.unfollowLoading = true;
            draft.unfollowError = null;
            draft.unfollowDone = false;
            break;
        case UNFOLLOW_SUCCESS:
            draft.unfollowLoading = false;
            draft.user.Followings = draft.user.Followings.filter((v) => v.id !== action.data)
            draft.unfollowDone = true;
            break;
        case UNFOLLOW_FAILURE:
            draft.unfollowLoading = false;
            draft.unfollowError = action.error;
            break;
    default :
        break;
    }
})

export default reducer;  