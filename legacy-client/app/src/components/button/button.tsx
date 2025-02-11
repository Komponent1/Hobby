import React from 'react';
import { Button } from '@mui/material';

type Prop = {
  label: string
  onClick: (event: React.MouseEvent) => void
  sx?: any
};
const SimpleButton: React.FC<Prop> = ({ label, onClick, sx }) => {
  return (
    <Button variant='outlined'
      sx={sx}
      onClick={onClick}>
      {label}
    </Button>
  )
};

export default SimpleButton;