import React from 'react';
import * as style from './style';
import { Input, FormBox } from '../../components';
import { Link } from '@mui/material';

type Prop = {
  email: string, setEmail: (e: string) => void
  password: string, setPassword: (e: string) => void
  submit: (e: React.MouseEvent) => void
  signupLinker: () => void
}
const LoginPresenter: React.FC<Prop> = 
({
  email, setEmail,
  password, setPassword,
  submit, signupLinker
}) => {
  return (
    <style.div>
      <FormBox width={20} height={20} label={'LOG IN'} submit={submit}>
        <Input label='email' value={email} onChange={e => setEmail(e.target.value)} />
        <Input label='password' type='Password' value={password} onChange={e => setPassword(e.target.value)} />
        <Link sx={style.link} onClick={signupLinker}>create account</Link>
      </FormBox>
    </style.div>
  )
};

export default LoginPresenter;
