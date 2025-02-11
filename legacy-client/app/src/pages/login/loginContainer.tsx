import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoading } from '../../hooks';
import { login } from '../../store/auth';
import LoginPresenter from './loginPresenter';

const useLogin = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { loading, navigate } = useLoading('auth');
  
  const dispatch = useDispatch();

  const submit = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(login(email, password, loading));
  };

  return {
    navigate,
    email, setEmail,
    password, setPassword,
    submit
  }
}

const Login: React.FC = () => {
  const param = useLogin();
  const { navigate } = param;
  const signupLinker = () => {
    navigate('/signup');
  } 

  return (
    <LoginPresenter {...param} signupLinker={signupLinker}/>
  )
};

export default Login;