import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import signup, { signupSaga } from './signup';
import { all, fork } from 'redux-saga/effects';

const rootReducer = combineReducers({ auth, signup });
export default rootReducer;
export type rootState = ReturnType<typeof rootReducer>;

export function* rootSaga (){
  yield all([ fork(authSaga), fork(signupSaga) ])
}

