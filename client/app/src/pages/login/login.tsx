import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/login';
import { rootState } from '../../store';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { data, loading, error } = useSelector((state: rootState) => state.login);
  const dispatch = useDispatch();

  const submit = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    
  }, [data]);
  useEffect(() => {
    
  }, [error]);

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
          <button className='button' onClick={submit}>button</button>
        </form>
      </div>
    </div>
  )
};

export default Login;