import { combineReducers } from 'redux';
import login, { loginSaga } from './login';
import load, { loadSaga } from './load';
import { all, fork } from 'redux-saga/effects';

const rootReducer = combineReducers({ login, load });
export default rootReducer;
export type rootState = ReturnType<typeof rootReducer>;

export function* rootSaga (){
  yield all([ fork(loginSaga), fork(loadSaga) ])
}

