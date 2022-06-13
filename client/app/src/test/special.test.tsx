import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import { setupServer } from 'msw/node';
import { handlers } from '../mockserver/spec';

import { Provider as ReduxProvider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from '../store';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider, Cookies } from 'react-cookie';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';

const server = setupServer(...handlers());
beforeAll(() => {
  server.listen();
  window.matchMedia = jest.fn().mockReturnValue({ matches: true });
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
  window.alert = jest.fn();
});
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer, 
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);
sagaMiddleware.run(rootSaga);

describe('Special TEST', () => {
  test('cookie TEST', async () => {
    const cookie = new Cookies();
    cookie.set('blog_refresh_token', 'some token');
    render(
      <CookiesProvider cookies={cookie}>
        <ReduxProvider store={store}>
          <ThemeProvider theme={theme} >
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </ReduxProvider>
      </CookiesProvider>
    );

    const logout = await screen.findByText('logout');
    userEvent.click(logout);
    expect(await screen.findByText('login')).toBeInTheDocument();
    expect(window.alert).toBeCalledTimes(1);
  });
});
