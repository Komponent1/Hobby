import * as request from 'supertest';
import { signUp } from '../controller';
import { Users } from '../model';

describe('Testing Signup', () => {
  const email = 'seo2im6492@gmail.com';
  const pw = '1234';

  test('정상 응답', async () => {
    Users.addUsers = jest.fn().mockReturnValue(null);
    Users.getUsers = jest.fn().mockReturnValue(null);
    await signUp(email, pw);
  });
});
