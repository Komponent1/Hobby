import React from 'react';
import { TextField } from '@mui/material';

type Prop = {
  value: string
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLTextAreaElement>) => void
  label?: string
  type?: string
}
const Input: React.FC<Prop> = (prop) => {

  return (
    <TextField
      fullWidth
      id='margin-dense'
      variant='outlined'
      
      {...prop}
    />
  );
}

export default Input;