import React from 'react';

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
    <div>
      <label>email
        <input
          value={email}
          onChange={e => setEmail(e.target.value)} />
      </label>
      <label>password
        <input
          value={password}
          onChange={e => setPassword(e.target.value)} />
      </label>
      <label>confirmpassword
        <input
          value={confirmPw}
          onChange={e => setConfirmPw(e.target.value)} />
      </label>
      <button className='signup' onClick={submit}>signup</button>
    </div>
  )
};

export default SignupPresenter;