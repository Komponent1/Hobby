import { call, put, takeEvery } from 'redux-saga/effects';
import { NavigateFunction, Location } from 'react-router-dom';
import * as api from '../api';

export const LOADER = 'LOADER/PENDING';
export const LOADER_SUCCESS = 'LOADER/SUCCESS';
export const LOADER_FAILURE = 'LOADER/FAILURE';
export const LOADER_CLEAR = 'LOADER/CLEAR';

export const signup = (email: string, password: string, navigate: NavigateFunction, location: Location, dep: string) => ({
  type: LOADER,
  payload: {
    email, password, navigate, location, dep
  }
});
export const loadClear = () => ({
  type: LOADER_CLEAR
});
export function* signupSaga(action: any) {
  const param: { email: string, password: string, navigate: NavigateFunction, location: Location, dep: string } = action.payload;
  param.navigate('/loading', { state: { backgroundLocation: param.location, dep: param.dep  } });

  const result: { result: boolean, msg: string } = yield call(api.signup, param.email, param.password);
  if (result.result) {
    yield put({
      type: LOADER_SUCCESS,
      payload: true,
    });
  } else {
    yield put({
      type: LOADER_FAILURE,
      payload: false,
    });
  };
}
export function* loadSaga() {
  yield takeEvery(LOADER, signupSaga);
}
export type tSignup = {
  loading: boolean,
  data: boolean|null
  error: boolean|null
};
const initialState: tSignup = {
  loading: false,
  data: null,
  error: null
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case LOADER:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case LOADER_SUCCESS:
      return {
        loading: false,
        data: true,
        error: null,
      }
    case LOADER_FAILURE:
      return {
        loading: false,
        data: null,
        error: true
      }
    case LOADER_CLEAR:
      return {
        loading: false,
        data: null,
        error: null,
      }
    default:
      return state
  }
}