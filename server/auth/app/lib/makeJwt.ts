import * as jwt from 'jsonwebtoken'
import { devHashKey } from '.';
import { ERROR } from '.';

const makeJwt = (email: string): { accessToken: string, refreshToken: string } => {
  try {
    return ({
      accessToken: jwt.sign({ email }, devHashKey.secret, devHashKey.option),
      /* TODO: Have to end token */
      refreshToken: jwt.sign({ email }, devHashKey.secret, { ...devHashKey.option, expiresIn: '1h' })
    });
  } catch(err) {
    ERROR.logicError(err);
  }
  return 
};

export default makeJwt;
