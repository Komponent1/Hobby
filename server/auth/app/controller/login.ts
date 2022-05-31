import { Request, Response, NextFunction } from 'express';
import { Users } from "../model";
import * as crypto from 'crypto';
import { makeJwt } from '../lib';

type tCheckHash = (password: string, salt: string, pw: string) => Promise<boolean>
export const checkHashed: tCheckHash = (password, salt, pw) => (
  new Promise((resolve, reject) => {
    crypto.pbkdf2(pw, salt, 9999, 64, 'sha512', (err, key) => {
      if (err) reject({ code: 500, err: 'Hashing Error' });
      
      if (key.toString('base64') === password) resolve(true);
      else resolve(false);
    });
  })
);

type tLogin = (email: string, pw: string) => Promise<{ accessToken: string, refreshToken: string }>
export const login: tLogin = async (email, pw) => {
  let user = null;
  try {
    user = await Users.get(email);
  } catch(err) {
    console.log('ERROR LOG(db)', err);
    if (err.code === 0) throw ({ code: 401, msg: 'No user in db'});
    else throw({ code: 500, msg: 'Error in DB' });
  };

  const { password, salt } = user;
  if (!await checkHashed(password, salt, pw)) {
    console.log('ERROR LOG(hashed)', 'Password no matched');
    throw ({ code: 401, msg: 'Not Correct Password' });
  }
  return makeJwt(email);
};

const postLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const result = await login(email, password);
    res.cookie('blog_refresh_token', result.refreshToken, {
      maxAge: 60 * 60 * 24 * 30
    });

    return res.status(200).json({
      email,
      access_token: result.accessToken,
      token_type: 'Bearer',
      expires_in: 1800,
      scope: 'create'
    });
  } catch (err) {
    next(err);
  }
};

export default postLogin;
