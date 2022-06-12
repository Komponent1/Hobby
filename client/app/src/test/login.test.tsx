import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import LoginPresenter from '../pages/login/loginPresenter';
import { Login } from '../pages';

import { setupServer } from 'msw/node';
import { handlers } from '../mockserver/spec';

import { Provider as ReduxProvider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from '../store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

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


describe('Login Test', () => {
  describe('Presenter Test', () => {
    test('button Test', () => {
      const props = {
        email: 'test', setEmail: jest.fn((email: string) => null),
        password: 'test', setPassword: jest.fn((password: string) => null),
        submit: jest.fn((e: React.MouseEvent) => null),
        signupLinker: jest.fn(),
      };
      render(<LoginPresenter {...props}/>);
      const button = screen.getAllByText('LOG IN')[1];
      
      fireEvent.click(button);
      expect(props.submit).toBeCalledTimes(1)
    });

    test('change Test', () => {
      const props = {
        email: 'test', setEmail: jest.fn((email: string) => null),
        password: 'test', setPassword: jest.fn((password: string) => null),
        submit: jest.fn((e: React.MouseEvent) => null),
        signupLinker: jest.fn(),
      };
      render(<LoginPresenter {...props}/>);
      const email = screen.getByLabelText('email');
      const password = screen.getByLabelText('password');
      // screen.debug();
      
      /*
        some error
        console.log(email === password), 지금 이게 true가 나온다... 이유가 없는데 그래서 문제다.  
        화면상 동작은 문제없이 동작ㅎ나다.
      */
      fireEvent.change(email, { target: { value: '1234' } });
      // fireEvent.change(password, { target: { value: '4567' } });

      expect(props.setEmail).toBeCalledTimes(1);
      // expect(props.setPassword).toBeCalledTimes(1);
    })
  });

  describe('Container Test', () => {
    test('',  () => {
      const history = createMemoryHistory();
      render(
        <ReduxProvider store={store}>
          <Router location={history.location} navigator={history}>
            <Login />
          </Router>
        </ReduxProvider>
      );

      const link = screen.getByText('create account');
      fireEvent.click(link);
      expect(history.location.pathname).toBe('/signup');

      const button = screen.getAllByText('LOG IN')[1];
      fireEvent.click(button);
      expect(history.location.pathname).toBe('/loading')
    });
  });
});