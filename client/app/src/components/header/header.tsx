import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { AuthButton, SimpleButton } from '..';
import *  as style from './style';
import { Typography } from '@mui/material';
import { rootState } from '../../store';

const BASENAME = 'seo2im6492@gmail.com'

const Header: React.FC = () => {
  const { data } = useSelector((state: rootState) => state.auth);
  const navigate = useNavigate();

  return (
    <style.header>
      <Typography onClick={() => navigate('/')} variant='h6' component='p'>{BASENAME}</Typography>
      <style.buttonDiv>
        {data && data.email === BASENAME?
          <SimpleButton sx={{ marginRight: '1rem'}} label='POST' onClick={() => navigate('/post')}/>
          :null
        }
        <AuthButton label={data? 'logout':'login'} />
      </style.buttonDiv>
    </style.header>
  )
};

export default Header;
