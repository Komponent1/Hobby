import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import useEvent from '@testing-library/user-event';
import { Category } from '../components';
import CategoryPresenter from '../components/category/categoryPresenter';

import { setupServer } from 'msw/node';
import { handlers } from '../mockserver/spec';
import * as data from '../mockserver/data'

import { Provider as ReduxProvider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from '../store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const server = setupServer(...handlers());

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer, 
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Category TEST', () => {
  test('Presenter TEST', () => {
    const items = data.category.map(e => ({
      text: e.name, onClick: jest.fn()
    }));
    const select = 0;

    render(
      <CategoryPresenter
        items={items} select={select}/>
    );

    const item = screen.getByText(items[0].text) as HTMLElement;
    expect(item).toBeInTheDocument();
    const style = window.getComputedStyle(item);
    expect(style.getPropertyValue('box-shadow')).toBe('5px 0px 0px -3px inset #1976d2');

    /* 정확한 여부는 모르겠으나 styled component의 &d은 동작하지 않는듯? */
    // const item2 = screen.getByText(items[1].text) as HTMLElement;
    // useEvent.hover(item2);
    // const style2 = window.getComputedStyle(item2);
    // expect(style2.getPropertyValue('box-shadow')).toBe('5px 0px 0px -3px inset grey');
    // expect(items[1].onClick).toBeCalledTimes(1);
  });

  test('Container TEST', async () => {
    const history = createMemoryHistory();

    render(
      <ReduxProvider store={store}>
        <Router location={history.location} navigator={history}>
          <Category />
        </Router>
      </ReduxProvider>
    );

    await expect(screen.getByText('전체보기')).toBeInTheDocument();
    const button = await screen.findByText('test_category_1');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    
    await waitFor(() => {
      expect(history.location.search).toBe('?category_id=0');
    });
  });
});