import { combineReducers } from 'redux';
import login, { lSaga } from './login';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({ login });


export default rootReducer;
export type rootState = ReturnType<typeof rootReducer>;