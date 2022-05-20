import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, NavigateFunction } from 'react-router-dom';
import { login } from '../../store/auth';
import LoginPresenter from './loginPresenter';

const useLogin = (navigate: NavigateFunction) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const location = useLocation();
  
  const dispatch = useDispatch();

  const submit = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(login(email, password, navigate, location, 'auth'));
  };

  return {
    email, setEmail,
    password, setPassword,
    submit
  }
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const param = useLogin(navigate);
  const signupLinker = () => {
    navigate('/signup');
  } 

  return (
    <LoginPresenter {...param} signupLinker={signupLinker}/>
  )
};

export default Login;