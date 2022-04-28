import { Users } from '../model';
import * as crypto from 'crypto'

const createPassword = (pw: string): Promise<{ password: string, salt: string }> => (
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

const signUp = async (email: string, pw: string): Promise<void> => {
  try {
    if ((await Users.getUsers(email)).length !== 0) {
      throw ({code: 500, msg: 'Already User' });
    }
  } catch(err) {
    throw ({ code: 500, msg: 'Checking error in db' })
  }
  
  const { password, salt } = await createPassword(pw);

  try {
    await Users.addUsers(email, password, salt);
  } catch(err) {
    throw ({ code: 500, msg: 'Error in addUser in db' });
  }
};

export default signUp;
