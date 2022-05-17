import getCategory from '../controller/getCatgory';
import { Category } from '../model';
import { Request, Response } from 'express';

describe('get /category', () => {
  const req = {
    query: { user: 'test_user' }
  } as Request<{}, {}, {}, { user: string }>
  const res = (() => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn((obj) => obj);
    return res;
  })() as Response;
  Category.get = jest.fn().mockReturnValue([ 'test category' ])

  describe('controller Test', () => {
    test('Normal Test', async () => {
      const response = await getCategory(req, res, (err) => err);
      expect(response).toHaveProperty('categories', ['test category']);
    });

    test('Error Case', async () => {
      Category.get = jest.fn(() => {
        throw 1;
      });
      const response = await getCategory(req, res, (err) => err);
      expect(response).toHaveProperty('msg', 'Error in DB');
    })
  });
});