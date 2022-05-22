import React from 'react';
import { CircularProgress } from '@mui/material';

const Loading: React.FC = () => {
  return (
    <div style={{ background: 'white', width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0}}>
      <CircularProgress />
    </div>
  )
};

export default Loading;