import React, { useCallback } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { refresh, logout as logoutAction } from '../../store/auth';
import { SimpleButton } from '..';

type Prop = {
  label: string
}
const AuthButtonContainer: React.FC<Prop> = ({ label }) => {
  const cookie = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const login = useCallback(async () => {
    const refresh_token = cookie.get('blog_refresh_token');
    if (refresh_token) {
      dispatch(refresh(navigate, location, 'auth'));
    } else {
      navigate('/login');
    }
  }, []);
  const logout = useCallback(() => {
    dispatch(logoutAction());
    alert('logout 되었습니다');
    navigate('/');
  }, [])

  return (
    <SimpleButton label={label} onClick={() => label === 'login' ? login():logout()}/>
  )
};

export default AuthButtonContainer;
