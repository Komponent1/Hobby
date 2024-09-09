import { useEffect, useMemo, useState } from 'react';
import { Cookies } from 'react-cookie';

const useLogin = (key: string) => {
  const cookie = useMemo(() => new Cookies(), []);
  const [loginUser, setLoginUser] = useState<string>('');
  useEffect(() => {
    const user = cookie.get(key);
    if (user) setLoginUser(user);
  }, [cookie, key]);

  return loginUser;
};

export default useLogin;
