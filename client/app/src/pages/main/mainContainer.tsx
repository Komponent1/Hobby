import React, { useState } from 'react';
import MainPresenter from './mainPresenter';
import { useLocation } from 'react-router-dom';

const MainContainer: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <MainPresenter pathname={pathname}/>
  )
};

export default MainContainer;
