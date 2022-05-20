import React from 'react';
import * as style from './style';
import { Input, SimpleButton } from '../../components';
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
    <div css={style.div}>
      <Input label='email' value={email} onChange={e => setEmail(e.target.value)} />
      <Input label='password' type='Password' value={password} onChange={e => setPassword(e.target.value)} />
      <Link onClick={signupLinker}>singup</Link>
      <SimpleButton label='Sign Up' onClick={submit} />
    </div>
  )
};

export default LoginPresenter;
