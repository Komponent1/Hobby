import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Header } from '../components';
import HeaderPresenter from '../components/header/headerPresenter';
import { BASENAME } from '../env';

import { setupServer } from 'msw/node';
import { handlers } from '../mockserver/spec';
import * as data from '../mockserver/data';

import { Provider as ReduxProvider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from '../store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { CookiesProvider } from 'react-cookie';
import { Cookies } from 'react-cookie';

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

describe('Header TEST', () => {
  describe('Presenter TEST', () => {
    const postClick = jest.fn();
    const mypageClick = jest.fn();
    
    test('not login header button & logo Click', () => {
      const history = createMemoryHistory();
      const label = 'login';
      const owner = false;
      const logoClick = jest.fn();

      render(
        <ReduxProvider store={store}>
          <Router location={history.location} navigator={history}>
            <HeaderPresenter 
              label={label} logoClick={logoClick} owner={owner}
              postClick={postClick} mypageClick={mypageClick}
            />
          </Router>
        </ReduxProvider>
      );
      
      expect(screen.getByText('login')).toBeInTheDocument();
      const logo = screen.getByText(BASENAME);
      fireEvent.click(logo);
      expect(logoClick).toBeCalledTimes(1);
    });

    test('login state button logout but not owner no show post button', () => {
      const history = createMemoryHistory();
      const label = 'logout';
      const owner = false;
      const logoClick = jest.fn();

      render(
        <ReduxProvider store={store}>
          <Router location={history.location} navigator={history}>
            <HeaderPresenter 
              label={label} logoClick={logoClick} owner={owner}
              postClick={postClick} mypageClick={mypageClick}
            />
          </Router>
        </ReduxProvider>
      );

      expect(screen.getByText('logout')).toBeInTheDocument();
      expect(screen.queryByText('POST')).not.toBeInTheDocument();
    });

    test('login state button & owner have post, mypage button', () => {
      const history = createMemoryHistory();
      const label = 'logout';
      const owner = true;
      const logoClick = jest.fn();

      render(
        <ReduxProvider store={store}>
          <Router location={history.location} navigator={history}>
            <HeaderPresenter 
              label={label} logoClick={logoClick} owner={owner}
              postClick={postClick} mypageClick={mypageClick}
            />
          </Router>
        </ReduxProvider>
      );

      const post = screen.getByText('POST');
      fireEvent.click(post);
      expect(postClick).toBeCalledTimes(1);
      const mypage = screen.getByText('My Page');
      fireEvent.click(mypage);
      expect(mypageClick).toBeCalledTimes(1);
    });
  });

  describe('Container TEST', () => {
    test('Header have routing', async () => {
      const history = createMemoryHistory();
      render(
        <ReduxProvider store={store}>
          <Router location={history.location} navigator={history}>
            <Header />
          </Router>
        </ReduxProvider>
      );
      const login = screen.getByText('login');
      fireEvent.click(login);
      await waitFor(() => {
        expect(history.location.pathname).toBe('/login')
      })

      const logo = screen.getByText(BASENAME);
      fireEvent.click(logo);
      await waitFor(() => {
        expect(history.location.pathname).toBe('/');
      });
    });

    test('have cookie? go to refresh & route', async () => {
      const history = createMemoryHistory();
      const cookie = new Cookies();
      cookie.set('blog_refresh_token', 'some token');
      window.alert = jest.fn();

      render(
        <CookiesProvider cookies={cookie}>
          <ReduxProvider store={store}>
            <Router location={history.location} navigator={history}>
              <Header />
            </Router>
          </ReduxProvider>
        </CookiesProvider>
      );
      
      const logout = await screen.findByText('logout');
      const post = await screen.findByText('POST');
      const mypage = await screen.findByText('My Page');
      fireEvent.click(post);
      await waitFor(() => {
        expect(history.location.pathname).toBe('/post');
      });
      fireEvent.click(mypage);
      await waitFor(() => {
        expect(history.location.pathname).toBe('/mypage');
      });
      fireEvent.click(logout);
      
      await waitFor(() => {
        expect(history.location.pathname).toBe('/');
        expect(screen.getByText('login')).toBeInTheDocument();
        expect(window.alert).toBeCalledTimes(1);
      })
    });
  });
});
