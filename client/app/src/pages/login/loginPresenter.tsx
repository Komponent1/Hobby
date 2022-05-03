import React from 'react';

type Prop = {
  email: string, setEmail: (e: string) => void
  password: string, setPassword: (e: string) => void
  submit: (e: React.MouseEvent) => void
}
const LoginPresenter: React.FC<Prop> = 
({
  email, setEmail,
  password, setPassword,
  submit
}) => {
  return (
    <div>
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
        <button onClick={submit}>login</button>
      </div>
    </div>
  )
};

export default LoginPresenter;
