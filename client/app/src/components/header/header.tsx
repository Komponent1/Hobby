import React from 'react';
import LoginButtonContainer from '../loginButton/loginButtonContainer';
import *  as style from './style';

const Header: React.FC = () => {
  return (
    <style.header>
      <LoginButtonContainer />
    </style.header>
  )
};

export default Header;
