/** @jsxImportSource @emotion/react */
import React from 'react';
import { Input, FormBox } from '../../components';
import * as style from './style';

type Prop = {
  email: string, setEmail: (email: string) => void,
  password: string, setPassword: (password: string) => void,
  confirmPw: string, setConfirmPw: (confirmPw: string) => void,
  submit: (e: React.MouseEvent) => void
}
const SignupPresenter: React.FC<Prop> = ({
  email, setEmail,
  password, setPassword,
  confirmPw, setConfirmPw,
  submit
}) => {
  return (
    <style.div>
      <FormBox width={20} height={25} label={'SIGN UP'} submit={submit}>
        <Input label='email' value={email} onChange={e => setEmail(e.target.value)}/>
        <Input label='password' type='Password' value={password} onChange={e => setPassword(e.target.value)} />
        <Input label='check password' type='Password' value={confirmPw} onChange={e => setConfirmPw(e.target.value)} />
      </FormBox>
    </style.div>
  )
};

export default SignupPresenter;