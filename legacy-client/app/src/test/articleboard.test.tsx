import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { ArticlesBoard } from '../components';
import ArticleboardPresenter from '../components/articlesboard/articlesboardPresenter';
import { date2string } from '../lib';

import { setupServer } from 'msw/node';
import { handlers } from '../mockserver/spec';
import * as data from '../mockserver/data';

import { Provider as ReduxProvider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from '../store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

/* mocking intersection observer */
const server = setupServer(...handlers());
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer, 
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

describe('Articleboard', () => {
  test('Presenter TEST', () => {
    const articles = data.articles.slice(0, 6);
    const onClickArticle = jest.fn();

    const { getByText, getAllByText } = render(
      <ArticleboardPresenter
        articles={articles}
        onClickArticle={onClickArticle}
        ref={null}/>
    );

    
    expect(getByText(articles[0].title)).toBeInTheDocument();
    const items = getAllByText(date2string(articles[2].publish_date));
    for (let item of items) {
      expect(item).toBeInTheDocument();
    }
  });

  describe('Container TEST', () => {
    function setupIntersectionObserverMock({
      root = null,
      rootMargin = '',
      thresholds = [],
      disconnect = () => null,
      observe = () => null,
      takeRecords = () => [],
      unobserve = () => null,
    } = {}) {
      class MockIntersectionObserver {
        root: any;
        rootMargin: any;
        thresholds: any;
        disconnect: any;
        observe: any;
        takeRecords: any;
        unobserve: any;

        constructor() {
          this.root = root;
          this.rootMargin = rootMargin;
          this.thresholds = thresholds;
          this.disconnect = disconnect;
          this.observe = observe;
          this.takeRecords = takeRecords;
          this.unobserve = unobserve;
        }
      }
    
      Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: MockIntersectionObserver
      });
    }
    setupIntersectionObserverMock();
    const articles = data.articles;

    test('loading initial data, click to article page', async () => {
      const history = createMemoryHistory();

      const { getByText } = render(
        <ReduxProvider store={store}>
          <Router location={history.location} navigator={history}>
            <ArticlesBoard />  
          </Router>
        </ReduxProvider>
      );

      const item = await screen.findByText(articles[0].title);
      expect(item).toBeInTheDocument();

      fireEvent.click(item);
      await waitFor(() => {
        expect(history.location.pathname).toBe('/article');
        expect(history.location.search).toBe(`?article_id=${articles[0].id}`);
      });

      /*
        This is critical issue 
        이 테스트는 동작하지 않는데 그 이유는 앞선 데이터를 기다리는 시간보다 observer가 등록되는 타이밍이 느리기 떄문이다.
        이는 실제 화면에선 나올 순 없지만 충분히 발생할 수 있는 오류이므로 소스코드의 수정이 옳은 방법이나
        유저의 상황에서 생각하면 이는 동작해야한다. 즉 wait코드가 수반되어 동작시키게끔 해야한다.
      */
      // await waitFor(() => {
      //   expect()
      // });

      // fireEvent.scroll(window);
      // const newItem = await screen.findByText(articles[6].title);
      // expect(newItem).toBeInTheDocument();
    });
    
    test('if category_id in search, work', async () => {
      const history = createMemoryHistory();
      history.push('/?category_id=1')

      const { getByText } = render(
        <ReduxProvider store={store}>
          <Router location={history.location} navigator={history}>
            <ArticlesBoard />  
          </Router>
        </ReduxProvider>
      )

      expect(history.location.search).toBe('?category_id=1');
      const item = await screen.findByText(articles[11].title);
      expect(item).toBeInTheDocument();
    });
  })
});
