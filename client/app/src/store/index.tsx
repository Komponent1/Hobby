import { combineReducers } from 'redux';
import login, { loginSaga } from './login';
import { all, fork } from 'redux-saga/effects';

const rootReducer = combineReducers({ login });
export default rootReducer;
export type rootState = ReturnType<typeof rootReducer>;

export function* rootSaga (){
  yield all([ fork(loginSaga) ])
}

