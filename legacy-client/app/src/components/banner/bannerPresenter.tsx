import React from 'react';
import { Typography, Avatar } from '@mui/material';
import { LOGO } from '../../env';
import * as style from './style';

type Prop = {
  title: string
  explain: string
};
const Banner: React.FC<Prop> = ({ title, explain }) => {

  return (
    <style.div>
      <style.textbox>
        <Typography
          sx={style.title}
          variant='h3'
          component='h1'>
          {title}
        </Typography>
        <Typography
          variant='h5'
          component='h5'>
          {explain}
        </Typography>
        <Avatar alt='owner' src={LOGO} sx={style.img}/>
      </style.textbox>
    </style.div>
  )
};

export default Banner;
