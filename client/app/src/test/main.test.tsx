import React from 'react';
import { render } from '@testing-library/react';
import { expectSaga } from 'redux-saga-test-plan';
import { setupServer } from 'msw/node';
import { handlers } from '../mockserver/spec';
import * as data from '../mockserver/data';
import { Provider as ReduxProvider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import categoryReducer, { categorySaga } from '../store/category';
import articlesReducer, { getArticlesSaga } from '../store/articles';
import { BrowserRouter } from 'react-router-dom';
import { Main } from '../pages';
import rootReducer from '../store';

const server = setupServer(...handlers());

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Main Page Test', () => {
  const email = 'seo2im6492@gmail.com';

  describe('Reducer TEST', () => {
    test('success (Category)TEST', () => {
      const param = { email };
      return expectSaga(categorySaga)
        .withReducer(categoryReducer)
        .dispatch({ type: 'GET_CATEGORY/PENDING', payload: param })
        .hasFinalState({
          loading: false,
          data: { categories: data.category },
          error: null
        })
        .silentRun();
    });
    test('error (Category)TEST', () => {
      const param = { email: 'error' };
      return expectSaga(categorySaga)
        .withReducer(categoryReducer)
        .dispatch({ type: 'GET_CATEGORY/PENDING', payload: param })
        .hasFinalState({
          loading: false,
          data: null,
          error: 500
        })
        .silentRun();
    });
    test('success (articles)TEST', () => {
      const param = { email, idx: 0, num: 5 };
      return expectSaga(getArticlesSaga)
        .withReducer(articlesReducer)
        .dispatch({ type: 'ARTICLES/PENDING', payload: param })
        .hasFinalState({
          loading: false,
          data: {
            articles: data.articles.slice(0 * 5, (0 + 1) * 5)
          },
          error: null
        })
        .silentRun();
    });
    test('fail (articles)TEST', () => {
      const param = { email: 'error', idx: 0, num: 5 };
      return expectSaga(getArticlesSaga)
        .withReducer(articlesReducer)
        .dispatch({ type: 'ARTICLES/PENDING', payload: param })
        .hasFinalState({
          loading: false,
          data: null,
          error: 500
        })
        .silentRun();
    });
  });

  describe('Presenter TEST', () => {
    const store = createStore(rootReducer, applyMiddleware(createSagaMiddleware()));
    
    test('데이터가 없는 화면 출력', () => {
      const component = render(
        <ReduxProvider store={store}>
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </ReduxProvider>
      );
      component.getByText('전체보기');
      component.getByText('개발 스토리');
      component.getByText('test_category_1');
    });

    test("메인화면에 데이터가 있는 경우", () => {
      const component = render(
        <ReduxProvider store={store}>
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </ReduxProvider>
      );
    })
  });
})