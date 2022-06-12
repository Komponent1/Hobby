import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
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
import { CookiesProvider, Cookies } from 'react-cookie';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';

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
});
beforeEach(async () => {
  const cookie = new Cookies();
  cookie.set('blog_refresh_token');

  render(
    <CookiesProvider cookies={cookie}>
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme} >
          <MemoryRouter initialEntries={['/mypage']}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </ReduxProvider>
    </CookiesProvider>
  )

  await screen.findByText('logout');
})
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());

describe('My Page TEST', () => {
  test('카테고리 추가', async () => {
    expect(await screen.findByText('Category 관리')).toBeInTheDocument();
    
    userEvent.click(screen.getByText('추가'));
    expect(await screen.findByText('카테고리 추가')).toBeInTheDocument();

    userEvent.click(screen.getAllByRole('button', { name: '추가' })[1]);
    expect(await screen.findByText('Now Loading')).toBeInTheDocument();
    expect(await screen.findByText('Category 관리')).toBeInTheDocument();
    
    /*
      TODO: Some Problem in test
      saga가 두번 발동한다.
      문제는 dispatch는 한번만 발생하는데 call이 두번 도는건지 문제가 있다.
      화면으로 테스트 할때는 문제가 없어서 원인을 찾을 수 가 없는 상황이다.
    */
    await screen.findAllByText(data.newCatetgory.name);
  });

  test('카테고리 수정', async () => {
    expect(await screen.findByText('Category 관리')).toBeInTheDocument();
    
    userEvent.click(screen.getAllByText('수정')[0]);
    expect(await screen.findByText('카테고리 수정')).toBeInTheDocument();
    
    userEvent.type(await screen.findByLabelText('category name'), 'test_name');

    const btn = await screen.findAllByRole('button', { name: '수정' })
    userEvent.click(btn[btn.length - 1]);

    expect(await screen.findByText('Category 관리')).toBeInTheDocument();
    expect(await screen.findByText('test_name')).toBeInTheDocument();    
  });

  test('카테고리 삭제', async () => {
    expect(await screen.findByText('Category 관리')).toBeInTheDocument();
    
    userEvent.click(screen.getAllByText('삭제')[0]);
    expect(await screen.findByText('정말 삭제하시겠습니까?')).toBeInTheDocument();

    const btn = await screen.findAllByRole('button', { name: '삭제' })
    userEvent.click(btn[btn.length - 1]);

    expect(await screen.findByText('Category 관리')).toBeInTheDocument();
    /* check screen.debug() */
  })
})
