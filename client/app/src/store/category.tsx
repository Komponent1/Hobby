import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../api';

export const GET_CATEGORY = 'GET_CATEGORY/PENDING';
export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY/SUCCESS';
export const GET_CATEGORY_FAILURE = 'GET_CATEGORY/FAILURE';

export const POST_CATEGORY = 'POST_CATEGORY/PENDING';
export const POST_CATEGORY_SUCCESS = 'POST_CATEGORY/SUCCESS';
export const POST_CATEGORY_FAILURE = 'POST_CATEGORY/FAILURE';

export const getCategory = (email: string) => ({
  type: GET_CATEGORY,
  payload: { email }
});
export function* getSaga(action: any) {
  const { email }: { email: string } = action.payload;

  const result: { code: number, data: any } = yield call(api.getCategory, email);
  if (result.code === 200) {
    yield put({
      type: GET_CATEGORY_SUCCESS,
      payload: result.data
    })
  } else {
    yield put({
      type: GET_CATEGORY_FAILURE,
      payload: result.code
    })
  }
};
export const postCategory = (token: string, email: string, category_name: string) => ({
  type: POST_CATEGORY,
  payload: { token, email, category_name }
});
export function* postSaga(action: any) {
  const  { token, email, category_name }:
  { token: string, email: string, category_name: string } = action.payload;

  const result: { code: number, data: any } = yield call(api.postCategory, token, email, category_name);
  if (result.code === 200) {
    yield put({
      type: POST_CATEGORY_SUCCESS,
      payload: result.data
    })
  } else {
    yield put({
      type: POST_CATEGORY_FAILURE,
      payload: result.code
    })
  }
}

export function *categorySaga() {
  yield takeLatest(GET_CATEGORY, getSaga);
  yield takeLatest(POST_CATEGORY, postSaga);
};
export type tGetCategory = {
  loading: boolean,
  data: any,
  error: number|null
};
const initialState: tGetCategory = {
  loading: false,
  data: null,
  error: null
};
const reducer = (state = initialState, action: any) => {
  switch(action.type) {
    case GET_CATEGORY:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case GET_CATEGORY_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_CATEGORY_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload
      };
    case POST_CATEGORY:
      return {
        ...state,
        loading: true,
      }
    case POST_CATEGORY_SUCCESS:
      return {
        loading: false,
        data: {
          categories: [...state.data.categories, action.payload.category]
        },
        error: null,
      }
    /* Check it error effect get action */
    case POST_CATEGORY_FAILURE:
      return {
        loading: false,
        data: [...state.data],
        error: action.payload
      }
    default:
      return state;
  }
}

export default reducer;
