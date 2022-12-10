
import { createWrapper } from 'next-redux-wrapper';
import {applyMiddleware, compose, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import reducer from '../reducers'

// thunk
// ({ dispatch, getState }) => (next) => (action) => {
//   if(typeof action ==='fuction'){
//     return action(dispatch, getState, extraArgument)
//   }
//   return next(action)
// }
// 3단고차함수라고함. action을 function으로 두고 function은 지연시킬수 있기때문에 나중에 실행이 가능


// ex) 로그를 찍는 미들웨어
const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  console.log(action)
  return next(action)
}




const configureStore = () => {
    const middlewares = [thunkMiddleware, loggerMiddleware]
    const enhancer = process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares)) 
      : composeWithDevTools(applyMiddleware(...middlewares))
    const store = createStore(reducer, enhancer);
    store.dispatch({
        type : 'CHANGE_NICKNAME',
        data : 'tang'
    })
    return store
};

const wrapper = createWrapper(configureStore, {
  debug: true,
// debug : true면 redux에 관한 설명이 나옴
// debug : process.env.NODE_ENV === 'development'
});

export default wrapper;

