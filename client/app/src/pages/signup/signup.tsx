import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const signup = async (e: React.MouseEvent) => {
    e.preventDefault();
    fetch('/auth/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email, password
      })
    }).then(res => {
      if (res.status === 204) {
        navigate('/login');
      }
    })
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
        <button className='signup' onClick={signup}>button</button>
      </form>
    </div>
  )
};

export default Signup;