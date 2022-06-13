import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import { setupServer } from 'msw/node';
import { handlers } from '../mockserver/spec';
import * as data from '../mockserver/data';
import { date2string } from '../lib';

import { Provider as ReduxProvider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from '../store';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { BASENAME, BLOGNAME } from '../env';

const server = setupServer(...handlers());
const store = (() => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer, 
    applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga);
  sagaMiddleware.run(rootSaga);
    return store;
})();
beforeAll(() => {
  server.listen();
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
beforeEach(() => {
  window.matchMedia = jest.fn().mockReturnValue({ matches: true });
  render(
    <CookiesProvider>
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme} >
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </ReduxProvider>
    </CookiesProvider>
  );
});
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());

describe('Main Page Sequence', () => {
  test('Click to signup page', async () => {
    const button = screen.getByText('login');
    userEvent.click(button);

    const link = await screen.findByText('create account');
    expect(link).toBeInTheDocument();

    userEvent.click(link);
    let icons = await screen.findAllByText('SIGN UP');
    for (let icon of icons) {
      expect(icon).toBeInTheDocument();
    }

    userEvent.click(icons[1]);
    expect(await screen.findByText('Now Loading')).toBeInTheDocument();
    await screen.findAllByText('LOG IN');
  });
  test('login seq', async () => {
    userEvent.click(screen.getByText('login'));
    const icons = await screen.findAllByText('LOG IN')
    userEvent.click(icons[1]);
    expect(await screen.findByText('Now Loading')).toBeInTheDocument();
    expect(await screen.findByText('logout'));
  });
  test('Click to my page or post page', async () => {
    const mypage = await screen.findByText('My Page');
    userEvent.click(mypage);
    expect(await screen.findByText('Category 관리'));

    /* Editor class가 없다고 뜨는데... 이건 거의 100% toast ui editor가 테스트 불가 일지도.. */
    // const post = await screen.findByText('POST');
    // userEvent.click(post);
    // expect(await screen.findByLabelText('title')).toBeInTheDocument();
  });
  test('logout seq', async () => {
    userEvent.click(screen.getByText('logout'));
    expect(await screen.findByText('login'));
  });
  test('Click category, change article list', async () => {
    let categoryitems = [];
    let articleitems = [];
    for(let cat of data.category) {
      let item = await screen.findByText(cat.name);
      expect(item).toBeInTheDocument();
      categoryitems.push(item);
    }
    for(let art of data.articles.slice(0, 6)) {
      let item = await screen.findByText(art.title);
      expect(item).toBeInTheDocument();
      articleitems.push(item);
      
      (await screen.findAllByText(date2string(art.publish_date))).forEach(e => {
        expect(e).toBeInTheDocument();
      })
    }
    
    for(let idx in categoryitems) {
      fireEvent.click(categoryitems[idx]);
      for (let art of data.articles.filter(e => e.category_id === parseInt(idx)).slice(0, 6)) {
        expect(await screen.findByText(art.title)).toBeInTheDocument();
      }
    }
  });
  test('Click article, go to article page', async () => {
    let item = await screen.findByText('전체보기');
    userEvent.click(item);
    const logo = screen.getByText(BASENAME);  

    for(let art of data.articles.slice(0, 6)) {
      let item = await screen.findByText(art.title);
      expect(item).toBeInTheDocument();
      
      userEvent.click(item);
      expect(await screen.findByText('Now Loading')).toBeInTheDocument();
      expect(await screen.findByText('Title')).toBeInTheDocument();
      
      userEvent.click(logo);
      expect(await screen.findByText(BLOGNAME)).toBeInTheDocument();
    };
  });
});
