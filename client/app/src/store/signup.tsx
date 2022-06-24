import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../api';
import { asyncActionCreator, createSaga } from '../lib/reduxLib';

export const SIGNUP_CLEAR = 'SIGNUP/CLEAR';

type SignupParam = { email: string, password: string, loading?: Function };
const [
  SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  signupActionCreator,
  signupSuccessActionCreator,
  signupFailureActionCreator
] = asyncActionCreator('SIGNUP');
export const signup =
(email: string, password: string, loading?: Function) =>
signupActionCreator<SignupParam>({ email, password, loading });
export const Saga = createSaga<SignupParam, {}>(
  signupSuccessActionCreator, signupFailureActionCreator,
  api.postUser
);
export const loadClear = () => ({
  type: SIGNUP_CLEAR
});
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
        error: action.payload
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
