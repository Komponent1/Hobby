import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from '../mockserver/spec';
import { Signup } from '../pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const server = setupServer(...handlers());

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('signup test', () => {
  test('<app test />', async () => {
    // render(
    //   <Router>
    //     <Routes>
    //       <Route path='/' element={ <Signup />}/>
    //       <Route path='/login' element={<div>login</div>} />
    //     </Routes>
    //   </Router>
    // )
    
    // expect(screen.getByText('button')).toBeInTheDocument();

    // fireEvent.change(screen.getByLabelText('email'), {target: {value: '123@123.com'}});
    // fireEvent.change(screen.getByLabelText('password'), {target: {value: '1234'}});
    // fireEvent.click(screen.getByText('button'));

    // await screen.findByText('login');
  });
});
