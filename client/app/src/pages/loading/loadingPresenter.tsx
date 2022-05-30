import React from 'react';
import { CircularProgress, Typography } from '@mui/material';

const Loading: React.FC = () => {
  const size = 200;

  return (
    <div style={{ background: 'rgba(0, 0, 0, 0)', width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0}}>
      <div style={{
        position: 'absolute',
        top: `calc(50vh - ${Math.floor(size / 2)}px)`,
        left: `calc(50vw - ${Math.floor(size / 2)}px)`
      }}>
        <CircularProgress size={size}/>
        <Typography sx={{ fontWeight: 'bold' }}  variant='h4' component='div' >Now loading</Typography>
      </div>
    </div>
  )
};

export default Loading;