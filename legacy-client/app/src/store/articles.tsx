import { Articles } from 'Data';
import { takeLatest } from 'redux-saga/effects';
import * as api from '../api';
import { asyncActionCreator, createSaga } from '../lib/reduxLib';

type GetParam = { email: string, idx: number, num: number, category_id?: string, loading?: Function, clear?: string };
const [
  GET_ARTICLES, GET_ARTICLES_SUCCESS, GET_ARTICLES_FAILURE,
  getArticlesActionCreator,
  getArticlesSuccessActionCreator,
  getArticlesFailureActionCreator 
] = asyncActionCreator('GET_ARTICLES')
export const getArticles =
(email: string, idx: number, num: number, category_id?: string, loading?: Function, clear?: string) =>
getArticlesActionCreator<GetParam>({ email, idx, num, category_id, loading });
export const Saga = createSaga<GetParam, Articles>(
  getArticlesSuccessActionCreator, getArticlesFailureActionCreator,
  api.getArticles
);
export function* getArticlesSaga() {
  yield takeLatest(GET_ARTICLES, Saga);
};
export type tGetArticles = {
  loading: boolean,
  data: any,
  error: number|null
};
const initialState: tGetArticles = {
  loading: false,
  data: null,
  error: null
};
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ARTICLES_SUCCESS:
      return {
        loading: false,
        data: action.payload.idx !== 0 ? {
          count: action.payload.count,
          articles: state.data ? [
            ...state.data.articles,
            ...action.payload.articles,
          ] : [...action.payload.articles]
        } : {
          count: action.payload.count,
          articles: [...action.payload.articles]
        },
        error: null,
      };
    case GET_ARTICLES_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload
      };
    default:
      return state;
  }
}

export default reducer;
