import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../store/login';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(login(email, password, navigate, location, 'login'));
  };

  return (
    <div>
      <div>
        <form>
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
          <button onClick={submit}>Button</button>
        </form>
      </div>
    </div>
  )
};

export default Login;