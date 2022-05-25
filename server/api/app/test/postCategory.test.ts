import postCategory, { addCategory } from '../controller/postCategory';
import { Category } from '../model';
import { Request, Response } from 'express';

describe('POST /category', () => {
  Category.get = jest.fn(() => {
    throw ({ code: 0 });
  });
  Category.post = jest.fn().mockReturnValue({ category_id: 'test_id', category_name: 'test_name' });
  const category_name = 'test_category';
  const user = 'test_user';

  describe('Router TEST', () => {
    const req = {
      body: { user, category_name },
    } as Request;
    req.headers = { 'x-user': user }
    const res = (() => {
      const res: any = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn((obj) => obj)
      return res;
    })() as Response;

    test('succuess TEST', async () => {
      const response = await postCategory(req, res, (err) => err) as any;
      
      expect(response.category).toHaveProperty('category_id', 'test_id');    
      expect(response.category).toHaveProperty('category_name', 'test_name');
    });

    test('fail TEST (User not matched)', async () => {
      req.headers = { 'x-user': '123' }
      const response = await postCategory(req, res, (err) => err) as any;
      expect(response).toHaveProperty('msg', 'No match client with blog owner');
    });
    
    test('fail TEST (DB post error)', async () => {
      req.headers = { 'x-user': user }
      Category.post = jest.fn(() => { throw 'err' });
      
      const response = await postCategory(req, res, (err) => err);
      expect(response).toHaveProperty('msg', 'DB server error');
    });
    
    test('fail TEST (category already name)', async () => {
      Category.get = jest.fn().mockReturnValue([]);

      const response = await postCategory(req, res, (err) => err);
      expect(response).toHaveProperty('msg', 'Already category name');
    });
  });
});