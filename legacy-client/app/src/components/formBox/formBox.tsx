import React from 'react';
import * as style from './style';
import { SimpleButton } from '..';
import { Typography } from '@mui/material';

type Prop = {
  width: number, height: number,
  children: JSX.Element|JSX.Element[]
  label: string,
  submit: (e: React.MouseEvent) => void
}
const FormBox: React.FC<Prop> = ({ label, submit, width, height, children }) => {
  return (
    <style.box width={width} height={height}>
      <Typography variant='h2' component='h3'>{label}</Typography>
      {children}
      <SimpleButton label={label} onClick={submit} sx={{ width: '100%' }}/>
    </style.box>
  )
};

export default FormBox;
