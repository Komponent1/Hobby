import { call, put, takeLatest } from 'redux-saga/effects';
import { NavigateFunction, Location } from 'react-router-dom';
import * as api from '../api';
import { token } from '../api/login';

export const LOGIN = 'AUTH/LOGIN';
export const REFRESH = 'AUTH/REFRESH';
export const AUTH_FAILURE = 'AUTH/FAILURE';
export const AUTH_SUCCESS = 'AUTH/SUCCESS';
export const LOGOUT = 'AUTH/LOGOUT';

export const login = (email: string, password: string, loading?: Function) => ({
  type: LOGIN,
  payload: { email, password, loading }
});
export function* loginSaga(action: any) {
  const { email, password, loading }:
  { email: string, password: string, loading?: Function } = action.payload;
  if (loading) loading('/');
  try {
    const result: token = yield call(api.login as any, email, password);
    yield put({
      type: AUTH_SUCCESS,
      payload: result,
    });
  } catch (err) {
    yield put({
      type: AUTH_FAILURE,
      err: true,
      payload: err
    })
  }
};
export const refresh = (loading?: Function) => ({
  type: REFRESH,
  payload: { loading }
});
export function* refreshSaga(action: any) {
  const { loading }: { loading: Function } = action.payload;
  if (loading) loading('/')
  try {
    const result: token = yield call(api.refresh as any);
    yield put({
      type: AUTH_SUCCESS,
      payload: result
    })
  } catch(err) {
    yield put({
      type: AUTH_FAILURE,
      err: true,
      payload: err
    })
  }
}
export const logout = () => ({
  type: LOGOUT
})

export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(REFRESH, refreshSaga);
}

export type tLogin = {
  loading: boolean,
  data: any,
  error: any
}
const initialState: tLogin = {
  loading: false,
  data: null,
  error: null
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN || REFRESH:
      return {
        ...state,
        loading: true,
        error: null
      };
    case AUTH_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null
      };
    case AUTH_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload
      };
    case LOGOUT:
      return initialState
    default:
      return state;
  }
};

export default reducer;
