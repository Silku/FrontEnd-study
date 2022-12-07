
import { createWrapper } from 'next-redux-wrapper';
import {applyMiddleware, compose, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducer from '../reducers'

const configureStore = () => {
    const middlewares = []
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

