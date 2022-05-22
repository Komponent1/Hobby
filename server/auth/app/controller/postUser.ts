import { Request, Response, NextFunction } from 'express';
import { Users } from '../model';
import * as crypto from 'crypto'

type tCreatePassword = (pw: string) => Promise<{ password: string, salt: string }>
const createPassword: tCreatePassword = (pw) => (
  new Promise((resolve, reject) => {
    try {
      const salt = crypto.randomBytes(64).toString('base64');
      crypto.pbkdf2(pw, salt, 9999, 64, 'sha512', (err, key) => {
        if (err) reject(({ code: 500, err: 'Hashing Error' }));
        resolve({ password: key.toString('base64'), salt });
      });
    } catch(err) {
      reject({ code: 500, msg: 'Crypto Error' });
    }
  })
);

type tSignup = (email: string, pw: string) => Promise<void>
export const signUp: tSignup = async (email, pw) => {
  try {
    const user = await Users.get(email);
    if (user) {
      throw ({ code: 401, msg: 'Already User' })
    }
  } catch (err) {
    if (err.code === 401) {
      throw(err);
    } if (err.code !== 0) {
      throw ({ code: 500, msg: 'Error in DB(select)' });
    }
  }
  
  const { password, salt } = await createPassword(pw);

  try {
    await Users.post(email, password, salt);
  } catch(err) {
    console.log(err)
    throw ({ code: 500, msg: 'Error in DB(insert)' });
  }
};

const postUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    await signUp(email, password);
    
    return res.status(204).end()
  } catch (err) {
    next(err);
  }
};

export default postUser;
