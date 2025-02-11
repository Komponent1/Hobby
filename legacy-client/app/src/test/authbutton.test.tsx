import React from 'react';
import { Cookies } from 'react-cookie';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthButton } from '../components';
import AuthButtonPresenter from '../components/authButton/authButtonPresenter';

import { Provider as ReduxProvider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from '../store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { setupServer } from 'msw/node';
import { handlers } from '../mockserver/spec';
import * as data from '../mockserver/data';

import { CookiesProvider } from 'react-cookie';

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

describe('AuthButton TEST', () => {
  describe('Presenter TEST', () => {
    test('when before login', () => {
      const onClick = jest.fn()

      render(
        <AuthButtonPresenter label={'login'} onClick={onClick} />
      );

      const item = screen.getByText('login')
      expect(item).toBeInTheDocument();
      fireEvent.click(item);
      expect(onClick).toBeCalledTimes(1);
    });

    test('when after login', () => {
      const onClick = jest.fn()

      render(
        <AuthButtonPresenter label={'logout'} onClick={onClick} />
      );

      const item = screen.getByText('logout')
      expect(item).toBeInTheDocument();
      fireEvent.click(item);
      expect(onClick).toBeCalledTimes(1);
    })
  });

  describe('Container TEST', () => {
    test('login', () => {
      const label = 'login';
      const history = createMemoryHistory(); 

      render(
        <ReduxProvider store={store}>
          <Router location={history.location} navigator={history}>
            <AuthButton label={label}/>
          </Router>
        </ReduxProvider>
      );
      
      const item = screen.getByText('login');
      expect(item).toBeInTheDocument();

      fireEvent.click(item);
      expect(history.location.pathname).toBe('/login');
    });

    test('logout', async () => {
      const label = 'logout';
      const history = createMemoryHistory();
      history.push('/article');

      window.alert = jest.fn();

      render(
        <ReduxProvider store={store}>
          <Router location={history.location} navigator={history}>
            <AuthButton label={label}/>
          </Router>
        </ReduxProvider>
      );
      
      const item = screen.getByText('logout');
      expect(item).toBeInTheDocument();

      fireEvent.click(item);
      await waitFor(() => {
        expect(history.location.pathname).toBe('/');
        expect(window.alert).toBeCalledTimes(1);
      })
    });

    test('cookie have login', async () => {
      const label = 'login';
      const history = createMemoryHistory();
      history.push('/article');
      const cookie = new Cookies()
      cookie.set('blog_refresh_token', 'some token');

      render(
        <CookiesProvider cookies={cookie}>
          <ReduxProvider store={store}>
            <Router location={history.location} navigator={history}>
              <AuthButton label={label}/>
            </Router>
          </ReduxProvider>
        </CookiesProvider>
      );

      const item = screen.getByText('login');
      expect(item).toBeInTheDocument();

      fireEvent.click(item);
      await waitFor(() => {
        expect(history.location.pathname).toBe('/loading');
      });
    })
  });
});
