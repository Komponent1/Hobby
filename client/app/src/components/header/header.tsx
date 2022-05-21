import React from 'react';
import { useSelector } from 'react-redux';
import { AuthButton } from '..';
import *  as style from './style';
import { Typography } from '@mui/material';
import { rootState } from '../../store';

const BASENAME = 'seo2im6492@gmail.com'

const Header: React.FC = () => {
  const { data } = useSelector((state: rootState) => state.auth);

  return (
    <style.header>
      <Typography variant='h6' component='p'>{BASENAME}</Typography>
      <AuthButton label={data? 'logout':'login'} />
    </style.header>
  )
};

export default Header;
