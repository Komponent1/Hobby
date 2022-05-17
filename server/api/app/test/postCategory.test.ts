import postCategory, { addCategory } from '../controller/postCategory';
import { Category } from '../model';
import { Request, Response } from 'express';

describe('post /category', () => {
  Category.get = jest.fn(() => {
    throw ({ code: 0 });
  });
  Category.post = jest.fn().mockReturnValue({ category_id: 'test_id', category_name: 'test_name' });
  const category_name = 'test_category';
  const user = 'test_user';

  describe('controller Test', () => {
    test('Normal Test', async () => {
      const new_category = await addCategory(category_name, user);
      expect(new_category).toHaveProperty('category_id', 'test_id');
    });

    test('Already Category Name', async () => {
      Category.get = jest.fn().mockReturnValue([1]);
      try {
        await addCategory(category_name, user);
      } catch (err) {
        expect(err).toHaveProperty('msg', 'Already category name');
      }
    });
  });

  describe('router Test', () => {
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

    test('Normal Test', async () => {
      Category.get = jest.fn(() => {
        throw ({ code: 0 });
      });
      const response = await postCategory(req, res, (err) => err);
      expect(response).toHaveProperty('category_id', 'test_id');    
    });

    test('User not same', async () => {
      req.headers = { 'x-user': '123' }
      const response = await postCategory(req, res, (err) => err);
      expect(response).toHaveProperty('msg', 'No match client with blog owner');
    });
  });
});