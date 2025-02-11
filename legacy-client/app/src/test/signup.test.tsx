import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SignupPresenter from '../pages/signup/signupPresenter';
import { Signup } from '../pages';

import { setupServer } from 'msw/node';
import { handlers } from '../mockserver/spec';

import { Provider as ReduxProvider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from '../store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer, 
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

const server = setupServer(...handlers());
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Signup Test', () => {
  describe('Presenter Test', () => {
    const props = {
      email: 'test', setEmail: jest.fn((email: string) => null),
      password: 'test', setPassword: jest.fn((password: string) => null),
      confirmPw: 'test', setConfirmPw: jest.fn((confirmPw: string) => null),
      submit: jest.fn((e: React.MouseEvent) => null),
      signupLinker: jest.fn(),
    };
    

    test('button Test', () => {
      render(<SignupPresenter {...props}/>);
      const button = screen.getAllByText('SIGN UP')[1];
      fireEvent.click(button);
      expect(props.submit.mock.calls.length).toBe(1);
    });

    test('change Test', () => {
      const component = render(<SignupPresenter {...props}/>);
      const email = component.getByLabelText('email');
      const password = component.getByLabelText('password');
      const confirmPw = component.getByLabelText('check password');

      /* Login과 동일한 문제 */
      fireEvent.change(email, { target: { value: '1234' } });
      // fireEvent.change(password, { target: { value: '4567' } });
      // fireEvent.change(confirmPw, { target: { value: '9000' } });
      expect(props.setEmail.mock.calls.length).toBe(1);
      // expect(props.setPassword.mock.calls.length).toBe(1);
      // expect(props.setConfirmPw.mock.calls.length).toBe(1);
    })
  });

  describe('Container Test', () => {
    test('Route test', () => {
      const history = createMemoryHistory();
      render(
        <ReduxProvider store={store}>
          <Router location={history.location} navigator={history}>
            <Signup />
          </Router>
        </ReduxProvider>  
      );

      const button = screen.getAllByText('SIGN UP')[1];
      fireEvent.click(button);
      expect(history.location.pathname).toBe('/loading')
    });

    test('Not correct alert', () => {
      const history = createMemoryHistory();
      render(
        <ReduxProvider store={store}>
          <Router location={history.location} navigator={history}>
            <Signup />
          </Router>
        </ReduxProvider>  
      );

      /* 지금 라벨을 가져오는게 이상하므로 다른거 찾을 수 있도록 해보자 */
      // const password = screen.getAllByLabelText('password');
      // console.log(password)
      // fireEvent.change(password, { target: { value: '4567' } });

      // const button = screen.getAllByText('SIGN UP')[1];
      // window.alert = jest.fn();
      // fireEvent.click(button);

      // expect(window.alert).toBeCalledTimes(1);
    });
  })
});