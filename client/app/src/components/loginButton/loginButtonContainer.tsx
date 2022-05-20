import React, { useCallback } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { refresh } from '../../store/auth';
import { SimpleButton } from '..';

const LoginButtonContainer: React.FC = () => {
  const cookie = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const click = useCallback(async () => {
    const refresh_token = cookie.get('blog_refresh_token');
    console.log(refresh_token)
    if (refresh_token) {
      dispatch(refresh(navigate, location, 'auth'));
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <SimpleButton label='login' onClick={() => click()}/>
  )
};

export default LoginButtonContainer;
