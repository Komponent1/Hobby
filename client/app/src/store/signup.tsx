import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../api';

export const SIGNUP = 'SIGNUP/PENDING';
export const SIGNUP_SUCCESS = 'SIGNUP/SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP/FAILURE';
export const SIGNUP_CLEAR = 'SIGNUP/CLEAR';

export const signup = (email: string, password: string, loading?: Function) => ({
  type: SIGNUP,
  payload: { email, password, loading }
});
export const loadClear = () => ({
  type: SIGNUP_CLEAR
});
export function* Saga(action: any) {
  const { email, password, loading }:
  { email: string, password: string, loading?: Function } = action.payload;
  if (loading) loading('/login');

  const result: { code: number, data: any } = yield call(api.postUser, email, password);
  if (result.code === 204) {
    yield put({
      type: SIGNUP_SUCCESS,
      payload: result.code,
    });
  } else {
    yield put({
      type: SIGNUP_FAILURE,
      payload: result.code,
    });
  };
}
export function* signupSaga() {
  yield takeLatest(SIGNUP, Saga);
};
export type tSignup = {
  loading: boolean,
  data: number|null
  error: number|null
};
const initialState: tSignup = {
  loading: false,
  data: null,
  error: null
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SIGNUP:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case SIGNUP_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };
    case SIGNUP_CLEAR:
      return {
        loading: false,
        data: null,
        error: null,
      };
    default:
      return state;
  }
}

export default reducer;
