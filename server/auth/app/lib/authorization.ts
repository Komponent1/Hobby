import * as jwt from 'jsonwebtoken';
import { devHashKey, ERROR } from '.';

type tToken = {
  id: string
}
const EXPIRE = 'expire';
const INVALID = 'invalid';
const decode = (token: string): string => {
  try {
    return (jwt.verify(token, devHashKey.secret) as tToken).id;
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      return EXPIRE;
    } else {
      return INVALID;
    }
  }
};
const authorization = (token) => {
  const result = decode(token);
  if (result === EXPIRE) {
    ERROR.authError('EXPIRED TOKEN')
  } else if (result === INVALID){
    ERROR.authError('INVALID TOKEN')
  }
  return result;
};

export default authorization;