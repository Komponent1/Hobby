import { Category } from 'Data';
import { takeLatest } from 'redux-saga/effects';
import * as api from '../api';
import { asyncActionCreator, createSaga } from '../lib/reduxLib';

type GetParam = { email: string, loading?: Function }
const [
  GET_CATEGORY, GET_CATEGORY_SUCCESS, GET_CATEGORY_FAILURE,
  getCategoryActionCreator,
  getCategorySuccessActionCreator,
  getCategoryFailureActionCreator
] = asyncActionCreator('GET_CATEGORY');
export const getCategory =
(email: string, loading?: Function) =>
getCategoryActionCreator<GetParam>({ email, loading });
export const getSaga = createSaga<GetParam, Category[]>(
  getCategorySuccessActionCreator, getCategoryFailureActionCreator,
  api.getCategory
);
type PostParam = { token: string, email: string, category_name: string, loading?: Function };
const [
  POST_CATEGORY, POST_CATEGORY_SUCCESS, POST_CATEGORY_FAILURE,
  postCategoryActionCreator,
  postCategorySuccessActionCreator,
  postCategoryFailureActionCreator
] = asyncActionCreator('POST_CATEGORY');
export const postCategory =
(token: string, email: string, category_name: string, loading?: Function) =>
postCategoryActionCreator<PostParam>({ token, email, category_name, loading });
export const postSaga = createSaga<PostParam, Category[]>(
  postCategorySuccessActionCreator, postCategoryFailureActionCreator,
  api.postCategory
);
type PatchParam = { token: string, email: string, category_id: string, category_name: string, loading?: Function };
const [
  PATCH_CATEGORY, PATCH_CATEGORY_SUCCESS, PATCH_CATEGORY_FAILURE,
  patchCategoryActionCreator,
  patchCategorySuccessActionCreator,
  patchCategoryFailureActionCreator
] = asyncActionCreator('PATCH_CATEGORY');
export const patchCategory =
(token: string, email: string, category_id: string, category_name: string, loading?: Function) =>
patchCategoryActionCreator<PatchParam>({ token, email, category_id, category_name, loading });
export const patchSaga = createSaga<GetParam, Category>(
  patchCategorySuccessActionCreator, patchCategoryFailureActionCreator,
  api.patchCategory
);
type DeleteParam = { token: string, email: string, category_id: string, loading?: Function };
const [
  DELETE_CATEGORY, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAILURE,
  deleteCategoryActionCreator,
  deleteCategorySuccessActionCreator,
  deleteCategoryFailureActionCreator
] = asyncActionCreator('DELETE_CATEGORY');
export const deleteCategory =
(token: string, email: string, category_id: string, loading?: Function) =>
deleteCategoryActionCreator<DeleteParam>({ token, email, category_id, loading });
export const deleteSaga = createSaga<GetParam, Category>(
  deleteCategorySuccessActionCreator, deleteCategoryFailureActionCreator,
  api.deleteCategory
);

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
