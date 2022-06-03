import getCategory from '../controller/getCatgory';
import { Category } from '../model';
import { Request, Response } from 'express';

describe('GET /category', () => {
  const req = {
    query: { user: 'test_user' }
  } as Request<{}, {}, {}, { user: string }>
  const res = (() => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn((obj) => obj);
    return res;
  })() as Response;

  describe('Router TEST', () => {
    Category.get = jest.fn().mockReturnValue([ 'test category' ])
    test('success TEST(정상동작)', async () => {
      const response = await getCategory(req, res, (err) => err) as any;
      expect(response).toHaveProperty('categories', ['test category']);
    });
    test('success TEST(정상동작)', async () => {
      Category.get = jest.fn(() => {
        throw ({ code: 0 });
      });
      const response = await getCategory(req, res, (err) => err) as any;
      expect(response).toHaveProperty('categories', []);
    });

    test('fail TEST(From DB)', async () => {
      Category.get = jest.fn(() => {
        throw ({ code: 1 });
      });
      const response = await getCategory(req, res, (err) => err) as any;
      expect(response).toHaveProperty('msg', 'Error In Db');
    });
  });
});