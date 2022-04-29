import { signUp } from '../controller';
import { Users } from '../model';

describe('Testing Signup', () => {
  const email = 'seo2im6492@gmail.com';
  const pw = '1234';

  test('정상 응답', async () => {
    Users.get = jest.fn().mockReturnValue(null);
    Users.post = jest.fn().mockReturnValue(null);
    await signUp(email, pw);
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
      expect(err.msg).toMatch('Error in addUser in db');
    })
  })
});
