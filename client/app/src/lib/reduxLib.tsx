import { ApiFunc } from "Api";
import { call, put } from "redux-saga/effects";

type ActionCreator = <T extends {}>(param: T) => ({ type: string, payload: T });
export const actionCreator = (type: string): ActionCreator => {
  return (param) => ({
    type: type,
    payload: param
  })
};
export const asyncActionCreator = (api: string):
[string, string, string, ActionCreator, ActionCreator, ActionCreator ] =>
{
  const PENDING = `${api}/PENDING`;
  const SUCCESS = `${api}/SUCCESS`;
  const FAILURE = `${api}/FAILURE`;

  return [
    PENDING, SUCCESS, FAILURE,

    actionCreator(PENDING),
    actionCreator(SUCCESS),
    actionCreator(FAILURE)
  ]
};
export const createSaga = <P extends { loading?: Function },  S>(
  successActionCreator: <T extends {}>(param: T) => ({ type: string, payload: T }),
  failureActionCreator: <T extends {}>(param: T) => ({ type: string, payload: T }),
  api: ApiFunc<any, any>
) => {
  function *saga(action: { type: string, payload: P }) {
    if (action.payload.loading) action.payload.loading()

    const result: { code: number, data: S } = yield call(api, action.payload)
    if (Math.floor(result.code / 100) === 2) {
      yield put(successActionCreator<S>(result.data))
    } else {
      yield put(failureActionCreator<number>(result.code))
    }
  }

  return saga;
};
