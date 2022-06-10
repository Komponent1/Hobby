import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../api';

export const GET_CATEGORY = 'GET_CATEGORY/PENDING';
export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY/SUCCESS';
export const GET_CATEGORY_FAILURE = 'GET_CATEGORY/FAILURE';

export const POST_CATEGORY = 'POST_CATEGORY/PENDING';
export const POST_CATEGORY_SUCCESS = 'POST_CATEGORY/SUCCESS';
export const POST_CATEGORY_FAILURE = 'POST_CATEGORY/FAILURE';

export const PATCH_CATEGORY = 'PATCH_CATEGORY/PENDING';
export const PATCH_CATEGORY_SUCCESS = 'PATCH_CATEGORY/SUCCESS';
export const PATCH_CATEGORY_FAILURE = 'PATCH_CATEGORY/FALIURE';

export const DELETE_CATEGORY = 'DELETE_CATEGORY/PENDING';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY/SUCCESS';
export const DELETE_CATEGORY_FAILURE = 'DELETE_CATEGORY/FAILURE';

export const getCategory = (email: string, loading?: Function) => ({
  type: GET_CATEGORY,
  payload: { email, loading }
});
export function* getSaga(action: any) {
  const { email, loading }: { email: string, loading?: Function } = action.payload;
  if (loading) loading('prev url');

  const result: { code: number, data?: any } = yield call(api.getCategory, email);
  if (result.code === 200) {
    yield put({
      type: GET_CATEGORY_SUCCESS,
      payload: result.data
    })
  } else {
    yield put({
      type: GET_CATEGORY_FAILURE,
      payload: result.code
    })
  }
};
export const postCategory = (token: string, email: string, category_name: string, loading?: Function) => ({
  type: POST_CATEGORY,
  payload: { token, email, category_name, loading }
});
export function* postSaga(action: any) {
  const  { token, email, category_name, loading }:
  { token: string, email: string, category_name: string, loading?: Function } = action.payload;
  if (loading) loading('prev url');

  const result: { code: number, data: any } = yield call(api.postCategory, token, email, category_name);
  if (result.code === 200) {
    yield put({
      type: POST_CATEGORY_SUCCESS,
      payload: result.data
    });
  } else {
    yield put({
      type: POST_CATEGORY_FAILURE,
      payload: result.code
    });
  }
}
export const patchCategory = (token: string, email: string, category_id: string, category_name: string, loading?: Function) => ({
  type: PATCH_CATEGORY,
  payload: { token, email, category_id, category_name, loading }
});
export function* patchSaga(action: any) {
  const { token, email, category_id, category_name, loading }:
  { token: string, email: string, category_id: string, category_name: string, loading?: Function } = action.payload
  if (loading) loading('/');

  const result: { code: number, data: any } = yield call(api.patchCategory, token, email, category_id, category_name);
  if (result.code === 200) {
    yield put({
      type: PATCH_CATEGORY_SUCCESS,
      payload: result.data
    });
  } else {
    yield put({
      type: PATCH_CATEGORY_FAILURE,
      payload: result.code
    });
  }
};
export const deleteCategory = (token: string, email: string, category_id: string, loading?: Function) => ({
  type: DELETE_CATEGORY,
  payload: { token, email, category_id, loading }
});
export function* deleteSaga(action: any) {
  const { token, email, category_id, loading }:
  { token: string, email: string, category_id: string, loading?: Function } = action.payload;
  if (loading) loading('prev url');

  const result: { code: number } = yield call(api.deleteCategory, token, email, category_id);
  if (result.code === 204) {
    yield put({
      type: DELETE_CATEGORY_SUCCESS,
      payload: category_id 
    })
  } else {
    yield put ({
      type: DELETE_CATEGORY_FAILURE,
      payload: result.code
    })
  }
};

export function *categorySaga() {
  yield takeLatest(GET_CATEGORY, getSaga);
  yield takeLatest(POST_CATEGORY, postSaga);
  yield takeLatest(PATCH_CATEGORY, patchSaga);
  yield takeLatest(DELETE_CATEGORY, deleteSaga);
};
export type tGetCategory = {
  loading: boolean,
  data: any,
  error: number|null
};
const initialState: tGetCategory = {
  loading: false,
  data: null,
  error: null
};
const reducer = (state = initialState, action: any) => {
  switch(action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        loading: true,
        error: null,        
      };
    case GET_CATEGORY_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_CATEGORY_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload
      };
    
      case POST_CATEGORY:
      return {
        ...state,
        loading: true,
      }
    case POST_CATEGORY_SUCCESS:
      return {
        loading: false,
        data: {
          categories: state.data?
          [...state.data.categories, action.payload.category]
          : [action.payload.category]
        },
        error: null,
      }
    /* Check it error effect get action */
    case POST_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    
    case PATCH_CATEGORY:
      return {
        ...state,
        loading: false,
      }
    case PATCH_CATEGORY_SUCCESS:
      return {
        loading: false,
        data: {
          categories: state.data.categories.map((e: any) => e.id === action.payload.category.id ?
            action.payload.category : e
          )
      },
        error: null,
      }
    case PATCH_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case DELETE_CATEGORY:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        loading: false,
        data: {
          categories: state.data.categories.filter((e: any) => e.id !== parseInt(action.payload))
        },
        error: null
      };
    case DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}

export default reducer;
