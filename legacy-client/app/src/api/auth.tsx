import { fetcher } from './fetcher';
import { ApiFunc } from 'Api';
/*
  AUTHORIZATION token
  RES:
    204, success
  ERROR:
    400, no auth header
    403, authentication 
*/
const auth: ApiFunc<{ token: string }, null> = async ({ token }) => {
  const res = await fetcher('/auth', {
    'Authorization': `Bearer ${token}`
  }, {});

  return { code: res.status, data: null };
};

export default auth;