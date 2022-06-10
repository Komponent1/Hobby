import React from 'react';
import { SimpleButton, AuthButton } from '..';
import * as style from './style';
import { Avatar, Typography } from '@mui/material';
import { BASENAME } from '../../env';

type Prop = {
  label: string
  owner: boolean
  logoClick: () => void
  postClick: () => void
  mypageClick: () => void
};
const HeaderPresenter: React.FC<Prop> = ({ logoClick, label, owner, mypageClick, postClick }) => { 
  return (
    <style.header>
      <style.logo>
        <Avatar
          sx={style.icon}
          alt={BASENAME} src='logo64.png' />
        <Typography
          sx={style.text}
          onClick={logoClick} variant='h6' component='p'>{BASENAME}</Typography>
      </style.logo>
      <style.buttonDiv>
        {owner && (
          <>
            <SimpleButton
            sx={style.button}
              label='POST'
              onClick={postClick}/>
            <SimpleButton
              sx={style.button}
              label='My Page'
              onClick={mypageClick}/>
          </>
        )}
        <AuthButton label={label} />
      </style.buttonDiv>
    </style.header>
  )
};

export default HeaderPresenter;
