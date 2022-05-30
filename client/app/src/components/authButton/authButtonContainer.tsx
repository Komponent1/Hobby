import React, { useCallback } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { refresh, logout as logoutAction } from '../../store/auth';
import { SimpleButton } from '..';
import { useLoading } from '../../hooks';

type Prop = {
  label: string
}
const AuthButtonContainer: React.FC<Prop> = ({ label }) => {
  const cookie = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useLoading('auth');
  const login = useCallback(async () => {
    const refresh_token = cookie.get('blog_refresh_token');
    if (refresh_token) {
      dispatch(refresh(loading));
    } else {
      navigate('/login');
    }
  }, []);
  const logout = useCallback(() => {
    dispatch(logoutAction());
    cookie.remove('blog_refresh_token');
    alert('logout 되었습니다');
    navigate('/');
  }, [])

  return (
    <SimpleButton label={label} onClick={() => label === 'login' ? login():logout()}/>
  )
};

export default AuthButtonContainer;
