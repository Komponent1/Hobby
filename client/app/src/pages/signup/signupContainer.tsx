import React, { useState } from 'react';
import SignupPresenter from './signupPresenter';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup } from '../../store/load';

type Prop = {
  
}
const useSignup = () => {
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ confirmPw, setConfirmPw ] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const submit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (password !== confirmPw) {
      alert('pw not same confirm');
      return;
    }
    dispatch(signup(email, password, navigate, location, 'load'));
  }

  return { email, setEmail, password, setPassword, confirmPw, setConfirmPw, submit  }
};
const SignupContainer: React.FC<Prop> = () => {
  const props = useSignup();

  return (
    <SignupPresenter {...props}/>
  )
};

export default SignupContainer;
