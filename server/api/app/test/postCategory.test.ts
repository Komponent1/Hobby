import postCategory, { addCategory } from '../controller/postCategory';
import { Category } from '../model';
import { Request, Response, NextFunction } from 'express';

describe('post /category', () => {
  Category.get = jest.fn().mockReturnValue([]);
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
      headers: { 'X-User': user },
      body: { user, category_name }
    };
    const res = (() => {
      const res: any = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn((obj) => obj)
      return res;
    })();

    test('Normal Test', async () => {
      const response = await postCategory(req, res, (err) => err);
      expect(response).toHaveProperty('category_id', 'test_id');    });
  });
});