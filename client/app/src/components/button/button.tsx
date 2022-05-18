import React from 'react';
import { Button } from '@mui/material';

type Prop = {
  label: string
  onClick: (event: React.MouseEvent) => void
};
const SimpleButton: React.FC<Prop> = ({ label, onClick }) => {
  return (
    <Button variant='contained'
      onClick={onClick}>
      {label}
    </Button>
  )
};

export default SimpleButton;