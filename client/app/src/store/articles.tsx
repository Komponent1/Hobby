import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../api';

export const ARTICLES = 'ARTICLES/PENDING';
export const ARTICLES_SUCCESS = 'ARTICLES/SUCCESS';
export const ARTICLES_FAILURE = 'ARTICLES/FAILURE';

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

export function* getArticlesSaga() {
  yield takeLatest(ARTICLES, Saga);
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
    case ARTICLES_FAILURE:
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
