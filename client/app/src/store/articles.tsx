import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../api';

export const ARTICLES = 'ARTICLES/PENDING';
export const ARTICLES_SUCCESS = 'ARTICLES/SUCCESS';
export const ARTICLES_FAILURE = 'ARTICLES/FAILURE';

export const DELETE_ARTICLE = 'DELETE_ARTICLE/PENDING';
export const DELETE_ARTICLE_SUCCESS = 'DELETE_ARTICLE/SUCCESS';
export const DELETE_ARTICLE_FAILURE = 'DELETE_ARTICLE/FAILURE';

export const getArticles = (email: string, idx: number, num: number, category_id?: string, loading?: Function, clear?: string) => ({
  type: ARTICLES,
  payload: { loading, email, idx, num, category_id, clear }
});
export function *Saga(action: any) {
  const { loading, email, idx, num, category_id }:
  { loading?: Function, email: string, idx: number, num: number, category_id?: string } = action.payload;

  if (loading) loading(category_id ? `/?category_id=${category_id}` : `/`);
  const result: { code: number, data: any } = yield call(api.getArticles, email, idx, num, category_id);
  if (result.code === 200) {
    yield put({
      type: ARTICLES_SUCCESS,
      payload: { ...result.data, idx }
    });
  } else {
    yield put({
      type: ARTICLES_FAILURE,
      payload: result.code
    });
  };
};
export const deleteArticle = (article_id: string, token: string, email: string, loading?: Function) => ({
  type: DELETE_ARTICLE,
  payload: { article_id, token, email, loading }
});
export function* deleteSaga(action: any) {
  const { article_id, token, email, loading }:
  { article_id: string, token: string, email: string, loading?: Function } = action.payload;
  if (loading) loading('/')

  const result: { code: number } = yield call(api.deleteArticle, token, email, article_id);
  if (result.code === 204) {
    yield put({
      type: DELETE_ARTICLE_SUCCESS,
      payload: article_id
    })
  } else {
    yield put({
      type: DELETE_ARTICLE_FAILURE,
      payload: result.code
    })
  }
};
export function* getArticlesSaga() {
  yield takeLatest(ARTICLES, Saga);
  yield takeLatest(DELETE_ARTICLE, deleteSaga);
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
    case ARTICLES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ARTICLES_SUCCESS:
      return {
        loading: false,
        data: action.payload.idx !== 0 ? {
          count: action.payload.count,
          articles: [
            ...state.data.articles,
            ...action.payload.articles,
          ] 
        } : action.payload,
        error: null,
      };
    case ARTICLES_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload
      };
    
    case DELETE_ARTICLE:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ARTICLE_SUCCESS:
      return {
        loading: false,
        data: {
          count: state.data.count - 1,
          articles: state.data.articles.filter((e: any) => e.id !== parseInt(action.payload))
        },
        error: null,
      };
    case DELETE_ARTICLE_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

export default reducer;
