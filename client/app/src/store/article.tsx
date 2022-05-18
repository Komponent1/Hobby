import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../api';

export const ARTICLE = 'ARTICLE/PENDING';
export const ARTICLE_SUCCESS = 'ARTICLE/SUCCESS';
export const ARTICLE_FAILURE = 'ARTICLE/FAILURE';

export const getArticle = (article_id: string) => ({
  type: ARTICLE,
  payload: { article_id }
});
export function *Saga(action: any) {
  const { article_id }: { article_id: string } = action.payload;

  const result: { code: number, data: any } = yield call(api.getArticle, article_id);
  if (result.code === 200) {
    yield put({
      type: ARTICLE_SUCCESS,
      payload: result.data
    })
  } else {
    yield put({
      type: ARTICLE_FAILURE,
      payload: result.code
    })
  }
};
export function* getArticleSaga() {
  yield takeLatest(ARTICLE, Saga);
};
export type tGetArticle = {
  loading: boolean,
  data: any,
  error: number|null
};
const initialState: tGetArticle = {
  loading: false,
  data: null,
  error: null
};
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ARTICLE:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case ARTICLE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case ARTICLE_FAILURE:
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
