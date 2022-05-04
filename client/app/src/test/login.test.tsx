import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { expectSaga } from 'redux-saga-test-plan';
import { setupServer } from 'msw/node';
import { handlers } from '../mockserver/spec';
import { login as api } from '../api';
import loginReducer, { authSaga } from '../store/auth';
import LoginPresenter from '../pages/login/loginPresenter';


const server = setupServer(...handlers());

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Login Test', () => {
  describe('Api Test', () => {
    test('Success Response', async () => {
      const email = 'seo2im6492@gmail.com';
      const password = '1234';

      const response = await api(email, password);
      expect(response).toHaveProperty('token_type', 'Bearer');
    });

    test('Fail Test(No User)', async () => {
      const email = 'nouser';
      const password = '1234';
      
      try {
        const response = await api(email, password);
      } catch (err) {
        expect(err).toHaveProperty('msg', 'No User in DB');
      }
    });

    test("Fail Test(Not password)", async () => {
      const email = 'nopassword';
      const password = '1234';

      try {
        const response = await api(email, password);
      } catch (err) {
        expect(err).toHaveProperty('msg', 'Not Matched Password');
      }
    })
  });

  describe('Saga Test', () => {
    test('Success', () => {
      const email = '123@test.com';
      const password = '1234';
      
      const param = {
        email, password, navigate: jest.fn(), location: {}, dep: ''
      };

      return expectSaga(authSaga)
        .withReducer(loginReducer)
        .dispatch({ type: 'AUTH/LOGIN', payload: param })
        .hasFinalState({
          loading: false,
          data: {
            accessToken: '124',
            token_type: 'Bearer',
            expires_in: 1800,
            scope: 'create'
          },
          error: null
        })
        .silentRun();
    });
  
    test('Failure(NO User)', () => {
      const email = 'nouser';
      const password = '123'
      const result = { result: false, msg: '' };
      const param = {
        email, password, navigate: jest.fn(), location: {}, dep: ''
      };
      
      return expectSaga(authSaga)
        .withReducer(loginReducer)
        .dispatch({ type: 'AUTH/LOGIN', payload: param })
        .hasFinalState({
          loading: false,
          data: null,
          error: { msg: 'No User in DB' }
        })
        .silentRun();
    });

    test('Failure (NO Password)', () => {
      const email = 'nopassword';
      const password = '123'
      const param = {
        email, password, navigate: jest.fn(), location: {}, dep: ''
      };
      
      return expectSaga(authSaga)
        .withReducer(loginReducer)
        .dispatch({ type: 'AUTH/LOGIN', payload: param })
        .hasFinalState({
          loading: false,
          data: null,
          error: { msg: 'Not Matched Password' }
        })
        .silentRun();
    });
  });

  describe('Presenter Test', () => {
    const props = {
      email: 'test', setEmail: jest.fn((email: string) => null),
      password: 'test', setPassword: jest.fn((password: string) => null),
      submit: jest.fn((e: React.MouseEvent) => null)
    };
    

    test('Have correct Props', () => {
      const component = render(<LoginPresenter {...props}/>);      
    });

    test('button Test', () => {
      const component = render(<LoginPresenter {...props}/>);
      const button = component.getByText('login');
      
      fireEvent.click(button);
      expect(props.submit.mock.calls.length).toBe(1);
    });

    test('change Test', () => {
      const component = render(<LoginPresenter {...props}/>);
      const email = component.getByLabelText('email');
      const password = component.getByLabelText('password');

      fireEvent.change(email, { target: { value: '1234' } });
      fireEvent.change(password, { target: { value: '4567' } });

      expect(props.setEmail.mock.calls.length).toBe(1);
      expect(props.setPassword.mock.calls.length).toBe(1);
    })
  });

  // describe('Container Test', () => {
  //   /* not yet */
  // })
});