
import { createWrapper } from 'next-redux-wrapper';
import {createStore} from 'redux'

import reducer from '../reducer/index'

const configureStore = () => {
    const store = createStore(reducer);
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

