import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import signup, { signupSaga } from './signup';
import category, { categorySaga } from './category';
import article, { articleSaga } from './article';
import articles, { getArticlesSaga } from './articles';
import { all, fork } from 'redux-saga/effects';

const rootReducer = combineReducers({ auth, signup, category, article, articles });
export default rootReducer;
export type rootState = ReturnType<typeof rootReducer>;

export function* rootSaga (){
  yield all([ 
    fork(authSaga),
    fork(signupSaga),
    fork(categorySaga),
    fork(getArticlesSaga),
    fork(articleSaga)
  ])
};
