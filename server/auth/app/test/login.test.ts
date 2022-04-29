import { login } from '../controller';
import { Users } from '../model';
import * as crypto from 'crypto';

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

/* types.d로 인터페이스 확장 후 사용 가능 */
// expect.extend({
//   matchKey(obj: { [key: string]: any }, keys: Array<string>) {
//     for(let key of Object.keys(obj)) {
//       if (keys.findIndex(e => key === e) === -1) return ({
//         pass: false,
//         message: () => `no match key list: ${key}`,
//       })
//     }
//     return ({
//       pass: true,
//       message: () => 'clear'
//     })
//   }
// });

describe('Testing Signup', () => {
  const email = 'seo2im6492@gmail.com';
  const pw = '1234';

  test('정상 응답', async () => {
    const { password, salt } = await createPassword(pw);

    Users.get = jest.fn().mockReturnValue({ email, password, salt });
    const result = await login(email, pw);

    console.log(result)
  });
});
