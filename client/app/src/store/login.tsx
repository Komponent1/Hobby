import { call, put, takeEvery } from 'redux-saga/effects';

export const LOGIN = 'LOGIN/PENDING';
export const LOGIN_FAILRUE = 'LOGIN/FAILURE';
export const LOGIN_SUCCESS = 'LOGIN/SUCCESS';

export const login = (email: string, password: string) => ({ type: LOGIN, payload: { email, password } });

type token = {
  access_token: string,
  token_type: string,
  expires_in: number,
  scope: string
}
const fetcher = async (email: string, password: string): Promise<token> => {
  const result = await fetch('/auth/login', {
    headers: { 'Content-Type': 'application/json' },
    method: 'post', body: JSON.stringify({ email, password })
  }).then(res => {
    console.log(res)
    return res.json();
  })

  return result;
};

export function* loginSaga(action: any) {
  console.log('saga work');
  const param: { email: string, password: string} = action.payload;
  try {
    const result: token = yield call(fetcher as any, param);
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
export function* lSaga() {
  yield takeEvery(LOGIN, loginSaga);
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

