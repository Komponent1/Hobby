import { Request, Response, NextFunction } from 'express';
import postUser, { signUp } from '../controller/postUser';
import { Users } from '../model';

describe('post /user', () => {
  const email = 'seo2im6492@gmail.com';
  const pw = '1234';

  describe('FunctionTest', () => {
    test('Normal Test', async () => {
      Users.get = jest.fn().mockReturnValue(null);
      Users.post = jest.fn().mockReturnValue(null);
      const spy = jest.spyOn(Users, 'get');
      await signUp(email, pw);

      expect(spy).toBeCalledTimes(1);
    });
  });

  test("이미 있음", async () => {
    Users.get = jest.fn().mockReturnValue([email, pw]);
    Users.post = jest.fn().mockReturnValue(null);
    
    signUp(email, pw).catch(err => {
      expect(err.msg).toMatch('Already User');
    })
  });

  test("DB 에러", async () => {
    Users.get = jest.fn().mockReturnValue(null);
    Users.post = jest.fn().mockRejectedValue({ code: 500, msg: 'Error in addUser in db'});

    signUp(email, pw).catch(err => {
      expect(err.msg).toMatch('Error in DB');
    })
  })
});
