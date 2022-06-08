import React, { useState } from 'react';
import MainPresenter from './mainPresenter';
import { useLocation } from 'react-router-dom';

const MainContainer: React.FC = () => {
  const { pathname } = useLocation();
  const [ open, setOpen ] = useState<boolean>(false);

  return (
    <MainPresenter open={open} setOpen={setOpen} pathname={pathname}/>
  )
};

export default MainContainer;
