import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { AuthButton, SimpleButton } from '..';
import *  as style from './style';
import { Typography, Avatar } from '@mui/material';
import { rootState } from '../../store';
import { BASENAME, EMAIL } from '../../env';
import { Cookies } from 'react-cookie';
import { refresh } from '../../store/auth';

const Header: React.FC = () => {
  const { data } = useSelector((state: rootState) => state.auth);
  const cookie = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const refresh_token = cookie.get('blog_refresh_token');
    if (!data && refresh_token) dispatch(refresh());  
  }, [ data ]);

  return (
    <style.header>
      <style.logo>
        <Avatar
          sx={{ width: '2rem', height: '2rem', margin: 'auto' }}
          alt={BASENAME} src='logo64.png' />
        <Typography
          sx={{ margin: 'auto', marginLeft: '1rem' }}
          onClick={() => navigate('/')} variant='h6' component='p'>{BASENAME}</Typography>
      </style.logo>
      <style.buttonDiv>
        {data && data.email === EMAIL?
          <>
            <SimpleButton sx={{ height: '2rem', margin: 'auto', marginRight: '1rem'}} label='POST' onClick={() => navigate('/post')}/>
            <SimpleButton sx={{ height: '2rem', margin: 'auto', marginRight: '1rem'}} label='My Page' onClick={() => navigate('/mypage')}/>
          </>
          :null
        }
        <AuthButton label={data? 'logout':'login'} />
      </style.buttonDiv>
    </style.header>
  )
};

export default Header;

/*
1px solid rgba(25, 118, 210, 0.5)
#1976d2
*/