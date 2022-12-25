
import { createWrapper } from 'next-redux-wrapper';
import {applyMiddleware, compose, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import reducer from '../reducers'
import rootSaga from '../sagas'




// ex) 로그를 찍는 미들웨어
const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  console.log(action);
  return next(action);
};


const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware , loggerMiddleware]
    const enhancer = process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares)) 
      : composeWithDevTools(applyMiddleware(...middlewares))
    const store = createStore(reducer, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    // store.dispatch({
    //     type : 'CHANGE_NICKNAME',
    //     data : 'tang'
    // })
    return store
};

const wrapper = createWrapper(configureStore, {
  debug: true,
// debug : true면 redux에 관한 설명이 나옴
// debug : process.env.NODE_ENV === 'development'
});

export default wrapper;

