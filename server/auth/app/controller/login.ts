import { Request, Response, NextFunction } from 'express';
import { Users } from "../model";
import * as crypto from 'crypto';
import { ERROR, makeJwt } from '../lib';
/*
  BODY: email, password
  RES:
    204, success
  ERROR:
    400, parameter
    403, authentication
    412, ref error(no email)
    500, logic or db
*/
const parse = (req: Request) => {
  try {
    const { email, password } = req.body;

    return ({ email, originpassword: password });
  } catch(err) {
    ERROR.paramError(err);
  }
};
type tCheckHash = (originpassword: string, salt: string, password: string) => Promise<boolean>
export const checkHashed: tCheckHash = (originpassword, salt, password) => (
  new Promise((resolve, reject) => {
    crypto.pbkdf2(originpassword, salt, 9999, 64, 'sha512', (err, key) => {
      if (err) {
        console.log('ERROR LOG(LOGIC)', err);
        reject({ code: 500, msg: 'Hashing Error' });
      }
      
      if (key.toString('base64') === password) resolve(true);
      else {
        console.log('ERROR LOG(auth)', );
        reject({ code: 403, msg: 'No Correct Password'});
      }
    });
  })
);
const dataFromDB = async (email: string) => {
  try {
    const user = await Users.get(email);

    return user;
  } catch(err) {
    ERROR.refError(err);
  };
}
const postLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, originpassword } = parse(req);
    const { password, salt } = await dataFromDB(email) as any;
    await checkHashed(originpassword, salt, password);
    
    const jwt = makeJwt(email);
    
    res.cookie('seolim_blog_access_token', jwt.accessToken, {
      maxAge: 60 * 60 * 24 * 30
    });
    res.cookie('seolim_blog_refresh_token', jwt.refreshToken, {
      maxAge: 60 * 60 * 24 * 30
    });

    return res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export default postLogin;
