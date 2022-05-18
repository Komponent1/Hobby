import { call, put, takeLatest } from 'redux-saga/effects';
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
export function* Saga(action: any) {
  const param: { email: string, password: string, navigate: NavigateFunction, location: Location, dep: string } = action.payload;
  param.navigate('/loading', { state: { backgroundLocation: param.location, dep: param.dep  } });

  const result: { code: number, data: any } = yield call(api.postUser, param.email, param.password);
  if (result.code === 204) {
    yield put({
      type: LOADER_SUCCESS,
      payload: result.code,
    });
  } else {
    yield put({
      type: LOADER_FAILURE,
      payload: result.code,
    });
  };
}
export function* signupSaga() {
  yield takeLatest(LOADER, Saga);
}
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
    case LOADER:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case LOADER_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      }
    case LOADER_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload,
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

export default reducer;
