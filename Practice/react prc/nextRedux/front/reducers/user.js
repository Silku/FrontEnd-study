export const initialState = {
    isLogIn : false,
    user: null,
    signUpData : {},
    loginData : {},
}


// thunk 코드 예시, 
// 실무에서 login 만들면 보통 request,success, failure로 구분해서 만들게 되는데 대략적인 thunk 활용 예.
export const loginAction = (data) =>{
    return (dispatch, getState) =>{
    const state = getState() // 이부분엔 initialState를 전달받게되는것임. reducer/index.js
        setTimeout(()=>{
            dispatch(loginRequestAction());
        },2000)
        axios.post('api/login')
            .then((res)=>{
                dispatch(loginSuccessAction(res.data))
            })
            .catch((err)=>{
                dispatch(loginFailureAction(err))
            })
    }
}

export const loginRequestAction =(data) =>{
    return {
        type: 'LOG_Request',
        data,
    }
}
export const loginSuccessAction =(data) =>{
    return {
        type: 'LOG_Success',
        data,
    }
}
export const loginFailureAction =(data) =>{
    return {
        type: 'LOG_Failure',
        data,
    }
}

export const logoutAction =() =>{
    return {
        type: 'LOG_OUT',
    }
}


const reducer = (state=initialState, action) =>{
    // reducer 분할 이전보다 depth가 낮아져서 한 단계 빼줌
    switch(action.type){
        case 'LOG_IN' : 
            return {
                ...state,
                isLogIn : true,
                user : action.data, 
            }
    case 'LOG_OUT' : 
        return {
            ...state,
            isLogIn : false,
            user : null, 
        }
    default :
        return state;
    }
}

export default reducer;