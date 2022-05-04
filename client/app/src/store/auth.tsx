import { call, put, takeLatest } from 'redux-saga/effects';
import { NavigateFunction, Location } from 'react-router-dom';
import * as api from '../api';
import { token } from '../api/login';

export const LOGIN = 'AUTH/LOGIN';
export const REFRESH = 'AUTH/REFRESH';
export const AUTH_FAILURE = 'AUTH/FAILURE';
export const AUTH_SUCCESS = 'AUTH/SUCCESS';


export const login = (email: string, password: string, navigate: NavigateFunction, location: Location, dep: string) => (
  {
    type: LOGIN,
    payload: {
      email, password, navigate, location, dep
    }
  }
);
export function* loginSaga(action: any) {
  const param: { email: string, password: string, navigate: NavigateFunction, location: Location, dep: string } = action.payload;
  param.navigate('/loading', { state: { backgroundLocation: param.location, dep: param.dep }});
  try {
    const result: token = yield call(api.login as any, param.email, param.password);
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
export const refresh = (callback: any) => (
  {
    type: REFRESH,
    payload: {
      callback
    }
  }
);
export function* refreshSaga(action: any) {
  const param: { callback: any/* dispather */ } = action.payload;
  param.callback();
  try {
    const result: token = yield call(api.refresh as any);
    param.callback();
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
    default:
      return state;
  }
};

export default reducer;
