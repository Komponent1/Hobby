import { fetcher } from './fetcher';

const auth = async (token: string) => {
  const res = await fetcher('/auth', {
    'Authorization': `Bearer ${token}`
  }, {});

  return res.status;
};

export default auth;