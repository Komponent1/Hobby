import { updateCategory } from "../controller";
import { Request, Response } from 'express';
import { Category } from "../model";

describe('UPDATE /category', () => {
  describe('Router TEST', () => {
    Category.patch = jest.fn().mockReturnValue('success');
    Category.get = jest.fn(() => { throw ({ code: 0 }) });
    const req = {
      body: { user: 'user', category_id: 'test_id', category_name: 'test_name' }
    } as Request;
    req.headers = { 'x-user': 'user'}
    const res = (() => {
      let res: any = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn((obj: any) => obj)
      
      return res;
    })() as Response;

    test('success TEST', async () => {
      const result = await updateCategory(req, res, (err:any) => err);

      expect(result).toHaveProperty('category', 'success');
    });
    test('fail TEST(DB)', async () => {
      Category.patch = jest.fn(() => { throw 'err' });
      const result = await updateCategory(req, res, (err:any) => err);

      expect(result).toHaveProperty('msg', 'Error in DB');
      Category.patch = jest.fn().mockReturnValue('success');
    });
    test('fail TEST(auth)', async () => {
      req.headers = {};
      const result = await updateCategory(req, res, (err:any) => err);

      expect(result).toHaveProperty('msg', 'No matched author with blog owner');
      req.headers = { 'x-user': 'user' };
    });
    test('fail TEST(already)', async () => {
      Category.get = jest.fn().mockReturnValue('some db');
      const result = await updateCategory(req, res, (err:any) => err);

      expect(result).toHaveProperty('msg', 'Already data in')
      Category.get = jest.fn(() => { throw ({ code: 0 }) })
    });
  });
});
