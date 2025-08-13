import React from 'react';
import {
  FormControl, TextField, Button, FormLabel,
} from '@mui/material';
import {useLogin} from './hooks/reservation.hook.login';

const ReservationLoginPage: React.FC = () => {
  const {
    uid, setUid, password, setPassword, login,
  } = useLogin();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={login} className="border p-4 rounded">
        <FormControl fullWidth margin="normal">
          <FormLabel component="legend">Login</FormLabel>
          <TextField
            label="ID"
            required
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </FormControl>
      </form>
    </div>
  );
};

export default ReservationLoginPage;
