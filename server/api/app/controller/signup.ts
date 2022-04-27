import { getUsers, addUsers } from '../model';
import crypto from 'crypto'

const createPassword = (pw: string): Promise<{ password: string, salt: string }> => (
  new Promise((resolve, reject) => {
    try {
      const salt = crypto.randomBytes(64).toString('base64');
      crypto.pbkdf2(pw, salt, 9999, 64, 'sha512', (err, key) => {
        if (err) reject(({ code: 500, err: 'Hashing Error' }));
        resolve({ password: key.toString('base64'), salt });
      });
    } catch(err) {
      reject({ code: 500, err: 'Salt Creating Error'});
    }
  })
);

const signUp = async (email: string, pw: string): Promise<void> => {
  if (await getUsers(email)) {
    throw ({ code: 500, err: 'Already User' });
  }
  const { password, salt } = await createPassword(pw);

  try {
    await addUsers(email, password, salt);
  } catch(err) {
    throw ({ code: 500, err: 'Error in addUser in db' });
  } 
};

export default signUp;
