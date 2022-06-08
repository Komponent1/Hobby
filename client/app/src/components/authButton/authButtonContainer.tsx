import React, { useCallback } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { refresh, logout as logoutAction } from '../../store/auth';
import { SimpleButton } from '..';
import { useLoading } from '../../hooks';
import * as style from './style';

type Prop = {
  label: string
}
const AuthButtonContainer: React.FC<Prop> = ({ label }) => {
  const cookie = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useLoading('refresh');
  const login = useCallback(async () => {
    const refresh_token = cookie.get('blog_refresh_token');
    if (refresh_token) {
      dispatch(refresh(loading));
    } else {
      navigate('/login');
    }
  }, []);
  const logout = useCallback(() => {
    cookie.remove('blog_refresh_token', { path: '/' });
    dispatch(logoutAction());
    alert('logout 되었습니다');
    navigate('/');
  }, []);

  return (
    <SimpleButton
      label={label}
      onClick={() => label === 'login' ? login():logout()}
      sx={style.button}
    />
  )
};

export default AuthButtonContainer;
