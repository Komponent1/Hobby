import { call, put, takeEvery } from 'redux-saga/effects';
import { NavigateFunction, Location } from 'react-router-dom';
import * as api from '../api';
import { token } from '../api/login';

export const LOGIN = 'LOGIN/PENDING';
export const LOGIN_FAILRUE = 'LOGIN/FAILURE';
export const LOGIN_SUCCESS = 'LOGIN/SUCCESS';

export const login = (email: string, password: string, navigate: NavigateFunction, location: Location, dep: string) => (
  {
    type: LOGIN,
    payload: {
      email, password, navigate, location, dep
    }
  }
);

export function* Saga(action: any) {
  const param: { email: string, password: string, navigate: NavigateFunction, location: Location, dep: string } = action.payload;
  param.navigate('/loading', { state: { backgroundLocation: param.location, dep: param.dep }});
  try {
    const result: token = yield call(api.login as any, param);
    yield put({
      type: LOGIN_SUCCESS,
      payload: result,
    });
  } catch (err) {
    yield put({
      type: LOGIN_FAILRUE,
      err: true,
      payload: err
    })
  }
};
export function* loginSaga() {
  yield takeEvery(LOGIN, Saga);
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

export default (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null
      };
    case LOGIN_FAILRUE:
      return {
        loading: false,
        data: null,
        error: action.payload
      };
    default:
      return state;
  }
}

