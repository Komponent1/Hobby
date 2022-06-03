import { Request, Response, NextFunction } from 'express';
import { Users } from '../model';
import * as crypto from 'crypto'
import { checkAlreadyIn, ERROR } from '../lib';

/*
  BODY: email, password
  RES:
    204, success
  ERROR:
    400, paramter
    412, ref (already email)
    500, logic or db
*/
const parse = (req: Request) => {
  try {
    const { email, password } = req.body;
    
    return  { email, password };
  } catch (err) {
    ERROR.paramError(err);
  }
};
type tCreatePassword = (pw: string) => Promise<{ hashpassword: string, salt: string }>
const createPassword: tCreatePassword = (pw) => (
  new Promise((resolve, reject) => {
    try {
      const salt = crypto.randomBytes(64).toString('base64');
      crypto.pbkdf2(pw, salt, 9999, 64, 'sha512', (err, key) => {
        if (err) reject(({ code: 500, err: 'Hashing Error' }));
        resolve({ hashpassword: key.toString('base64'), salt });
      });
    } catch(err) {
      console.log('ERROR LOG(LOGIC)', err);
      reject({ code: 500, msg: 'Crypto Error' });
    }
  })
);
type tSignup = (email: string, hashpassword: string, salt: string) => Promise<void>
export const signUp: tSignup = async (email, hashpassword, salt) => {
  try {
    await Users.post(email, hashpassword, salt);
  } catch(err) {
    ERROR.dbError(err);
  }
};
const postUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = parse(req);
    await checkAlreadyIn('Users', [email]);
    const { hashpassword, salt } = await createPassword(password);
    await signUp(email, hashpassword, salt);
    
    return res.status(204).end()
  } catch (err) {
    next(err);
  }
};

export default postUser;
