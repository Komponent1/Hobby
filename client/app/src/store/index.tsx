import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import signup, { signupSaga } from './signup';
import category, { getCategorySaga } from './category';
import article, { getArticleSaga } from './article';
import articles, { getArticlesSaga } from './articles';
import { all, fork } from 'redux-saga/effects';

const rootReducer = combineReducers({ auth, signup, category, article, articles });
export default rootReducer;
export type rootState = ReturnType<typeof rootReducer>;

export function* rootSaga (){
  yield all([ 
    fork(authSaga),
    fork(signupSaga),
    fork(getCategorySaga),
    fork(getArticlesSaga),
    fork(getArticleSaga)
  ])
};
