import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../api';

export const CATEGORY = 'CATEGORY/PENDING';
export const CATEGORY_SUCCESS = 'CATEGORY/SUCCESS';
export const CATEGORY_FAILURE = 'CATEGORY/FAILURE';

export const getCategory = (email: string) => ({
  type: CATEGORY,
  payload: { email }
});
export function* Saga(action: any) {
  const { email }: { email: string} = action.payload;

  const result: { code: number, data: any } = yield call(api.getCategory, email);
  if (result.code === 200) {
    yield put({
      type: CATEGORY_SUCCESS,
      payload: result.data
    })
  } else {
    yield put({
      type: CATEGORY_FAILURE,
      payload: result.code
    })
  }
};
export function *getCategorySaga() {
  yield takeLatest(CATEGORY, Saga);
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
    case CATEGORY:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case CATEGORY_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case CATEGORY_FAILURE:
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
