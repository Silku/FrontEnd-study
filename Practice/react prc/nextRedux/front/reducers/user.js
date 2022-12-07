export const initialState = {
    isLogIn : false,
    user: null,
    signUpData : {},
    loginData : {},
}

export const loginAction =(data) =>{
    return {
        type: 'LOG_IN',
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