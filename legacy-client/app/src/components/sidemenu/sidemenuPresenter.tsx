import React from 'react';
import * as style from './style';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Avatar } from '@mui/material';

type Prop = {
  open: boolean,
  toggle: () => void
  children: JSX.Element
};
const SidemenuPresenter: React.FC<Prop> = ({ open, toggle, children }) => {
  return (
    <>
      <style.menu open={open}>
        {children}
      </style.menu>
      <style.menuOpen open={open} onClick={toggle}>
      <Avatar sx={style.logo}>
        <ArrowBackIcon />
        </Avatar>
      </style.menuOpen>
    </>
  )
};

export default SidemenuPresenter;
