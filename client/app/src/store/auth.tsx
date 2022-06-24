import { Token } from 'prismjs';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../api';
import { actionCreator, asyncActionCreator, createSaga } from '../lib/reduxLib';

export const LOGOUT = 'AUTH/LOGOUT';

type AuthParam = { email: string, password: string, loading?: Function }
const [
  LOGIN, AUTH_SUCCESS, AUTH_FAILURE,
  authActionCreator,
  authSuccessActionCreator,
  authFailureActionCreator
] = asyncActionCreator('AUTH');
export const login =
(email: string, password: string, loading?: Function) =>
authActionCreator<AuthParam>({ email, password, loading });
export const loginSaga = createSaga<AuthParam, Token>(
  authSuccessActionCreator, authFailureActionCreator,
  api.login
);

type RefreshParam = { loading?: Function };
export const REFRESH = 'AUTH/REFRESH';
const refreshActionCreator = actionCreator('AUTH/REFRESH');
export const refresh = (loading?: Function) => refreshActionCreator<RefreshParam>({ loading });
export const refreshSaga = createSaga<RefreshParam, Token>(
  authSuccessActionCreator, authFailureActionCreator,
  api.refresh
);
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
export const initialState: tLogin = {
  loading: false,
  data: null,
  error: null
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        data: null,
        loading: true,
        error: null
      };
    case REFRESH:
      return {
        loading: true,
        data: null,
        error: null,
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
      return {
        loading: false,
        data: {},
        error: null,
      }
    default:
      return state;
  }
};

export default reducer;
