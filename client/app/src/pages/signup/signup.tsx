import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signup } from '../../store/load';
import { useDispatch } from 'react-redux';

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const submit = async (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(signup(email, password, navigate, location, 'load'))
  }

  return (
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
        <button className='signup' onClick={submit}>button</button>
      </form>
    </div>
  )
};

export default Signup;