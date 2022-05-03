import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { setupServer } from 'msw/node';
import { handlers } from '../../mockserver/spec';
import { signup as api } from '../../api';
import loadReducer, { loadSaga } from '../../store/load';
import SignupPresenter from '../../pages/signup/signupPresenter';


const server = setupServer(...handlers());

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Signup Test', () => {
  describe('Api Test', () => {
    test('Success Response', async () => {
      const email = 'test@test.com';
      const password = 'test';

      const response = await api(email, password);
      expect(response).toHaveProperty('result', true);
    });

    test('Fail Test', async () => {
      const email = 'seo2im6492@gmail.com';
      const password = '1234';
      
      const response = await api(email, password);
      expect(response).toHaveProperty('result', false);
    });
  });

  describe('Saga Test', () => {
    test('Success', () => {
      const email = 'test@test.com';
      const password = '1234';
      const result = { result: true, msg: 'SUCCESS' };
      const param = {
        email, password, navigate: jest.fn(), location: {}, dep: ''
      };

      return expectSaga(loadSaga)
        .withReducer(loadReducer)
        .provide([[ call(api, email, password), result ]])
        .put({ type: 'LOADER/SUCCESS', payload: true})
        .dispatch({ type: 'LOADER/PENDING', payload: param })
        .hasFinalState({
          loading: false,
          data: true,
          error: null,
        })
        .silentRun();
    });

    test('Failure', () => {
      const email = 'seo2im6492@gmail.com';
      const password = '123'
      const result = { result: false, msg: '' };
      const param = {
        email, password, navigate: jest.fn(), location: {}, dep: ''
      };
      
      return expectSaga(loadSaga)
        .withReducer(loadReducer)
        .provide([[ call(api, email, password), result ]])
        .put({ type: 'LOADER/FAILURE', payload: false })
        .dispatch({ type: 'LOADER/PENDING', payload: param })
        .hasFinalState({
          loading: false,
          data: null,
          error: true,
        })
        .silentRun();
    });
  });

  describe('Presenter Test', () => {
    const props = {
      email: 'test', setEmail: jest.fn((email: string) => null),
      password: 'test', setPassword: jest.fn((password: string) => null),
      confirmPw: 'test', setConfirmPw: jest.fn((confirmPw: string) => null),
      submit: jest.fn((e: React.MouseEvent) => null)
    };
    

    test('Have correct Props', () => {
      const component = render(<SignupPresenter {...props}/>);      
    });

    test('button Test', () => {
      const component = render(<SignupPresenter {...props}/>);
      const button = component.getByText('signup');
      fireEvent.click(button);
      expect(props.submit.mock.calls.length).toBe(1);
    });

    test('change Test', () => {
      const component = render(<SignupPresenter {...props}/>);
      const email = component.getByLabelText('email');
      const password = component.getByLabelText('password');
      const confirmPw = component.getByLabelText('confirmpassword')

      fireEvent.change(email, { target: { value: '1234' } });
      fireEvent.change(password, { target: { value: '4567' } });
      fireEvent.change(confirmPw, { target: { value: '9000' } });
      expect(props.setEmail.mock.calls.length).toBe(1);
      expect(props.setPassword.mock.calls.length).toBe(1);
      expect(props.setConfirmPw.mock.calls.length).toBe(1);
    })
  });

  
});