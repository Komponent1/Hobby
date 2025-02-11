import React from 'react';
import * as style from './style';
import { SimpleButton } from '..';

type Prop = {
  label: string;
  onClick: (e: React.MouseEvent) => void
}
const AuthButtonPresenter: React.FC<Prop> = ({ label, onClick }) => {
  return (
    <SimpleButton
      label={label}
      onClick={onClick}
      sx={style.button}
    />
  )
};

export default AuthButtonPresenter;
