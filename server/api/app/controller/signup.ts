import { Users } from '../model';
import * as crypto from 'crypto'

export function signupException(msg: string) {
  this.code = 500;
  this.msg = msg;
};
const createPassword = (pw: string): Promise<{ password: string, salt: string }> => (
  new Promise((resolve, reject) => {
    try {
      const salt = crypto.randomBytes(64).toString('base64');
      crypto.pbkdf2(pw, salt, 9999, 64, 'sha512', (err, key) => {
        if (err) reject(({ code: 500, err: 'Hashing Error' }));
        resolve({ password: key.toString('base64'), salt });
      });
    } catch(err) {
      reject(new signupException('Crypto Error'));
    }
  })
);

const signUp = async (email: string, pw: string): Promise<void> => {
  if (await Users.getUsers(email)) {
    throw new signupException('Already User');
  }
  const { password, salt } = await createPassword(pw);

  try {
    await Users.addUsers(email, password, salt);
  } catch(err) {
    throw new signupException('Error in addUser in db');
  }
};

export default signUp;
