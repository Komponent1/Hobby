import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../store/login';
import LoginPresenter from './loginPresenter';

const useLogin = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(login(email, password, navigate, location, 'login'));
  };

  return {
    email, setEmail,
    password, setPassword,
    submit
  }
}

const Login: React.FC = () => {
  const param = useLogin();

  return (
    <LoginPresenter {...param}/>
  )
};

export default Login;