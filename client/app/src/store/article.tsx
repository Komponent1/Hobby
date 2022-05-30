import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../api';

export const GET_ARTICLE = 'GET_ARTICLE/PENDING';
export const GET_ARTICLE_SUCCESS = 'GET_ARTICLE/SUCCESS';
export const GET_ARTICLE_FAILURE = 'GET_ARTICLE/FAILURE';

export const POST_ARTICLE = 'POST_ARTICLE/PENDING';
export const POST_ARTICLE_SUCCESS = 'POST_ARTICLE/SUCCESS';
export const POST_ARTICLE_FAILURE = 'POST_ARTICLE/FAILURE';

export const DELETE_ARTICLE = 'DELETE_ARTICLE/PENDING';
export const DELETE_ARTICLE_SUCCESS = 'DELETE_ARTICLE/SUCCESS';
export const DELETE_ARTICLE_FAILURE = 'DELETE_ARTICLE/FAILURE';

export const PATCH_ARTICLE = 'PATCH_ARTICLE/PENDING';
export const PATCH_ARTICLE_SUCCESS = 'PATCH_ARTICLE/SUCCESS';
export const PATCH_ARTICLE_FAILURE = 'PATCH_ARTICLE/FAILURE';

export const ARTICLE_CLREAR = 'ARTICLE/CLEAR';

export const getArticle = (article_id: string, loading?: Function) => ({
  type: GET_ARTICLE,
  payload: { article_id, loading }
});
export function *getSaga(action: any) {
  const { article_id, loading }:
  { article_id: string, loading?: Function } = action.payload;
  if (loading) loading(`/article?article_id=${article_id}`);

  const result: { code: number, data: any } = yield call(api.getArticle, article_id);
  if (result.code === 200) {
    yield put({
      type: GET_ARTICLE_SUCCESS,
      payload: result.data
    })
  } else {
    yield put({
      type: GET_ARTICLE_FAILURE,
      payload: result.code
    })
  }
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
    })
  } else {
    yield put({
      type: DELETE_ARTICLE_FAILURE,
      payload: result.code
    })
  }
};
export const patchArticle = (article_id: string, token: string, email: string, file: FormData, loading?: Function) => ({
  type: PATCH_ARTICLE,
  payload: { article_id, token, email, file, loading }
});
export function* patchSaga(action: any) {
  const { article_id, token, email, file, loading }:
  { article_id: string, token: string, email: string, file: FormData, loading: Function } = action.payload;
  if (loading) loading(`/article?article_id=${article_id}`);

  const result: { code: number, data: any } = yield call(api.patchArticle, token, email, article_id, file);
  if (result.code === 200) {
    yield put({
      type: PATCH_ARTICLE_SUCCESS,
      payload: result.data,
    });
  } else {
    put({
      type: PATCH_ARTICLE_FAILURE,
      payload: result.code,
    });
  }
}
export const postArticle = (token: string, email: string, category_id: string, file: FormData, loading?: Function) => ({
  type: POST_ARTICLE,
  payload: { token, email, category_id, file, loading }
});
export function* postSaga(action: any) {
  const { token, email, category_id, file, loading }:
  { token: string, email: string, category_id: string, file: FormData, loading?: Function } = action.payload;
  if (loading) loading((article_id: string) => `/article?article_id=${article_id}`);

  const result: { code: number, data: any } = yield call(api.postArticle, token, email, category_id, file);
  if (result.code === 200) {
    yield put({
      type: POST_ARTICLE_SUCCESS,
      payload: result.data
    });
  } else {
    yield put({
      type: POST_ARTICLE_FAILURE,
      payload: result.code
    })
  }
};
export function* articleSaga() {
  yield takeLatest(GET_ARTICLE, getSaga);
  yield takeLatest(DELETE_ARTICLE, deleteSaga);
  yield takeLatest(PATCH_ARTICLE, patchSaga);
  yield takeLatest(POST_ARTICLE, postSaga);
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
    case GET_ARTICLE:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_ARTICLE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_ARTICLE_FAILURE:
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
      return initialState;
    case DELETE_ARTICLE_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    
    case PATCH_ARTICLE:
      return {
        ...state,
        loading: true
      };
    case PATCH_ARTICLE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null
      };
    case PATCH_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case POST_ARTICLE:
      return {
        ...state,
        loading: true,
        error: null
      };
    case POST_ARTICLE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null
      };
    case POST_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case ARTICLE_CLREAR:
      return initialState;
    default:
      return state;
  }
}

export default reducer;
