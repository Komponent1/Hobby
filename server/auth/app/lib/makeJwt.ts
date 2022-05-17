import * as jwt from 'jsonwebtoken'
import { devHashKey } from '.';

const makeJwt = (email: string): { accessToken: string, refreshToken: string } => {
  return ({
    accessToken: jwt.sign({ email }, devHashKey.secret, devHashKey.option),
    /* TODO: Have to end token */
    refreshToken: jwt.sign({ email }, devHashKey.secret, { ...devHashKey.option, expiresIn: '1h' })
  })
};

export default makeJwt;
