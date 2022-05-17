import * as jwt from 'jsonwebtoken';
import { devHashKey } from '.';

type tToken = {
  email: string
}
const decode = (token: string): string => {
  try {
    return (jwt.verify(token, devHashKey.secret) as tToken).email;
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      return EXPIRE;
    } else {
      return INVALID;
    }
  }
};

const EXPIRE = 'expire';
const INVALID = 'invalid';

const authorization = (token) => {
  const result = decode(token);
  if (result === EXPIRE) {
    throw ({
      code: 401,
      msg: 'expire token'
    });
  } else if (result === INVALID){
    throw ({
      code: 401,
      msg: 'invalid token'
    });
  }
  return result;
};

export default authorization;