import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Banner } from '../components';
import BannerPresenter from '../components/banner/bannerPresenter';

import { Provider as ReduxProvider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from '../store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { BLOGEXPLAIN, BLOGNAME } from '../env';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer, 
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

describe('Banner TEST', () => {
  test('Presentation TEST', () => {
    const title = 'TITLE';
    const explain = 'some explain';

    render(
      <BannerPresenter title={title} explain={explain} />
    )

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(explain)).toBeInTheDocument();
  });

  describe('Container TEST',() => {
    test('"/" is only name & explain', () => {
      const history = createMemoryHistory();

      render(
        <ReduxProvider store={store}>
          <Router location={history.location} navigator={history}>
            <Banner />
          </Router>
        </ReduxProvider>
      );
  
      expect(screen.getByText(BLOGNAME)).toBeInTheDocument();
      expect(screen.getByText(BLOGEXPLAIN)).toBeInTheDocument();
    });

    test('article_id or category_id is no explain', () => {
      const history = createMemoryHistory();
      history.push('/article?article_id=1');
      render(
        <ReduxProvider store={store}>
          <Router location={history.location} navigator={history}>
            <Banner />
          </Router>
        </ReduxProvider>
      );

      expect(screen.queryByText(BLOGEXPLAIN)).not.toBeInTheDocument();

      history.push('/?category_id=1');
      render(
        <ReduxProvider store={store}>
          <Router location={history.location} navigator={history}>
            <Banner />
          </Router>
        </ReduxProvider>
      );

      expect(screen.queryByText(BLOGEXPLAIN)).not.toBeInTheDocument();
    });
  });
})