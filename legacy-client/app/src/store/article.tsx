import { Article } from 'Data';
import { takeLatest } from 'redux-saga/effects';
import * as api from '../api';
import { asyncActionCreator, createSaga } from '../lib/reduxLib';

export const ARTICLE_CLREAR = 'ARTICLE/CLEAR';
type GetParam = { article_id: string, loading?: Function }
const [
  GET_ARTICLE, GET_ARTICLE_SUCCESS, GET_ARTICLE_FAILURE,
  getArticleActionCreateor,
  getArticleSuccessActionCreator,
  getArticleFailureActionCreator,
] = asyncActionCreator('GET_ARTICLE');
export const getArticle =
(article_id: string, loading?: Function) =>
getArticleActionCreateor<GetParam>({ article_id, loading })
export const getSaga = createSaga<GetParam, Article>(
  getArticleSuccessActionCreator, getArticleFailureActionCreator,
  api.getArticle
);
type PostParam = { token: string, email: string, category_id: number, file: FormData, loading?: Function }
const [
  POST_ARTICLE, POST_ARTICLE_SUCCESS, POST_ARTICLE_FAILURE,
  postArticleActionCreator,
  postArticleSuccessActionCreator,
  postArticleFailureActionCreator
] = asyncActionCreator('POST_ARTICLE');
export const postArticle =
(token: string, email: string, category_id: number, file: FormData, loading?: Function) =>
postArticleActionCreator<PostParam>({ token, email, category_id, file, loading });
export const postSaga = createSaga<PostParam, Article>(
  postArticleSuccessActionCreator, postArticleFailureActionCreator,
  api.postArticle
);
type PatchParam = { article_id: string, category_id: number, token: string, email: string, file: FormData, loading?: Function }
const [
  PATCH_ARTICLE, PATCH_ARTICLE_SUCCESS, PATCH_ARTICLE_FAILURE,
  patchArticleActionCreator,
  patchArticleSuccessActionCreator,
  patchArticleFailureActionCreator
] = asyncActionCreator('PATCH_ARTICLE');
export const patchArticle =
(article_id: string, category_id: number, token: string, email: string, file: FormData, loading?: Function) =>
patchArticleActionCreator<PatchParam>({ article_id, category_id, token, email, file, loading });
export const patchSaga = createSaga<PatchParam, Article>(
  patchArticleSuccessActionCreator, patchArticleFailureActionCreator,
  api.patchArticle
)
type DeleteParam = { article_id: string, token: string, email: string, loading?: Function }
const [
  DELETE_ARTICLE, DELETE_ARTICLE_SUCCESS, DELETE_ARTICLE_FAILURE,
  deleteArticleActionCreator,
  deleteArticleSuccessActionCreator,
  deleteArticleFailureActionCreator
] = asyncActionCreator('DELETE_ARTICLE');
export const deleteArticle =
(article_id: string, token: string, email: string, loading?: Function) =>
deleteArticleActionCreator<DeleteParam>({ article_id, token, email, loading });
export const deleteSaga = createSaga<DeleteParam, { article_id: number }>(
  deleteArticleSuccessActionCreator, deleteArticleFailureActionCreator,
  api.deleteArticle
)
export function* articleSaga() {
  yield takeLatest(GET_ARTICLE, getSaga);
  yield takeLatest(PATCH_ARTICLE, patchSaga);
  yield takeLatest(POST_ARTICLE, postSaga);
  yield takeLatest(DELETE_ARTICLE, deleteSaga);
};
export type tGetArticle = {
  loading: boolean,
  data: any,
  error: number|null
};
const initialState: tGetArticle = {
  loading: false,
  data: null,
  error: null
};
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ARTICLE:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_ARTICLE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_ARTICLE_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload
      };
    
    case PATCH_ARTICLE:
      return {
        ...state,
        loading: true
      };
    case PATCH_ARTICLE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null
      };
    case PATCH_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case POST_ARTICLE:
      return {
        ...state,
        loading: true,
        error: null
      };
    case POST_ARTICLE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null
      };
    case POST_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DELETE_ARTICLE:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ARTICLE_SUCCESS:
      return {
        loading: false,
        data: null,
        error: null,
      };
    case DELETE_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case ARTICLE_CLREAR:
      return initialState;
    default:
      return state;
  }
}

export default reducer;
