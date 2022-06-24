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
const auth = async (token: string): Promise<number> => {
  const res = await fetcher('/auth', {
    'Authorization': `Bearer ${token}`
  }, {});

  return res.status;
};

export default auth;