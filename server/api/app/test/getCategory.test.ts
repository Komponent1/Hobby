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
    test('success TEST', async () => {
      const response = await getCategory(req, res, (err) => err) as any;
      expect(response).toHaveProperty('categories', ['test category']);
    });

    test('fail TEST', async () => {
      Category.get = jest.fn(() => {
        throw 1;
      });
      const response = await getCategory(req, res, (err) => err) as any;
      expect(response).toHaveProperty('msg', 'Error in DB');
    })
  });
});