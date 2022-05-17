import postLogin, { login } from '../controller/login';
import { Request, Response, NextFunction } from 'express';
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

describe('post /login', () => {
  const email = 'seo2im6492@gmail.com';
  const pw = '1234';

  describe('Function Test', () => {
    test('Normal Test', async () => {
      const { password, salt } = await createPassword(pw);
  
      Users.get = jest.fn().mockReturnValue({ email, password, salt });
      const result = await login(email, pw);
      expect(Object.keys(result)).toContain('refreshToken')
    });

    test('Error Case(유저X)', async () => {
      Users.get = jest.fn(() => {
        throw ({ code: 0})
      });
      try {
        const result = await login(email, pw);
      } catch(err) {
        expect(err.msg).toMatch('No user in db')
      }
    });

    test('Error Case(패스워드 오류)', async () => {
      const { password, salt } = await createPassword('12345');
      
      Users.get = jest.fn().mockReturnValue({ email, password, salt });
      login(email, pw).catch(err => {
        expect(err.msg).toMatch('Not Correct Password');
      })
    });
  });

  describe('Router Test', () => {
    const req = {
      body: { email, password: pw }
    } as Request;
    const res = (() => {
      const res: any = {};
      res.status = jest.fn().mockReturnValue(res);
      res.cookie = jest.fn();
      res.json = jest.fn(obj => obj);
      return res;
    })() as Response;

    test('Normal Test', async () => {
      const { password, salt } = await createPassword(pw);
      Users.get = jest.fn().mockReturnValue({ email, password, salt });

      const response = await postLogin(req, res, err => err);

      expect(response).toHaveProperty('token_type', 'Bearer');
    });
  });
});
