import * as jwt from 'jsonwebtoken'
import { devHashKey } from '.';
import { ERROR } from '.';

const makeJwt = (id: string): { accessToken: string, refreshToken: string } => {
  try {
    return ({
      accessToken: jwt.sign({ id }, devHashKey.secret, { ...devHashKey.option, expiresIn: '30d' }),
      /* TODO: Have to end token */
      refreshToken: jwt.sign({ id }, devHashKey.secret, { ...devHashKey.option, expiresIn: '30d' })
    });
  } catch(err) {
    ERROR.logicError(err);
  }
  return 
};

export default makeJwt;
