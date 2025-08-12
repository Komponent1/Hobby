import React from 'react';
import {useLogin} from './hooks/reservation.hook.login';

const ReservationLoginPage: React.FC = () => {
  const {
    uid, setUid, password, setPassword, login,
  } = useLogin();

  return (
    <div>
      <form onSubmit={login}>
        <input
          type="text"
          placeholder="ID"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default ReservationLoginPage;
