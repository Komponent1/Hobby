import { Users } from "../model";
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken'

export const devHashKey: { secret: string, option: jwt.SignOptions } = {
  secret: 'Secret',
  option: {
    algorithm: 'HS256',
    expiresIn: '30m',
  }
}

export const checkHashed = (password: string, salt: string, pw: string): Promise<boolean> => (
  new Promise((resolve, reject) => {
    crypto.pbkdf2(pw, salt, 9999, 64, 'sha512', (err, key) => {
      if (err) reject({ code: 500, err: 'Hashing Error' });
      
      if (key.toString('base64') === password) resolve(true);
      else resolve(false);
    });
  })
);

export const makeJwt = (email: string): { accessToken: string, refreshToken: string } => {
  return ({
    accessToken: jwt.sign({ email }, devHashKey.secret, devHashKey.option),
    /* TODO: Have to end token */
    refreshToken: jwt.sign({ email }, devHashKey.secret, { ...devHashKey.option, expiresIn: '1h' })
  })
};

const login = async (email: string, pw: string): Promise<{ accessToken: string, refreshToken: string }> => {
  const user = (await Users.get(email))[0];

  if (!user) {
    throw ({ code: 501, msg: 'No User in db'});
  }
  
  const { password, salt } = user;
  if (!await checkHashed(password, salt, pw)) {
    throw ({ code: 400, msg: 'Not Correct Password' });
  }
  return makeJwt(email);
};

export default login;
