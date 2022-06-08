import React, { useRef } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import * as style from './style';

const Loading: React.FC = () => {
  const size = useRef<number>(200);

  return (
    <style.background>
      <style.div size={size.current}>
        <CircularProgress size={size.current}/>
        <Typography sx={style.text}  variant='h4' component='div' >
          Now Loading
        </Typography>
      </style.div>
    </style.background>
  )
};

export default Loading;
