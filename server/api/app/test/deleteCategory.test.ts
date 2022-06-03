import deleteCategory from "../controller/deleteCategory";
import { Request, Response } from 'express';
import { Category } from "../model";

describe('DELETE /category', () => {
  Category.del = jest.fn().mockReturnValue({ path: 'file path' });

  describe('Router TEST', () => {
    type deleteCategoryQuery = { user: string, category_id: string }
    const req = {
      query: { user: 'user', category_id: 'test' }
    } as Request<{}, {}, {}, deleteCategoryQuery>;
    req.headers = { 'x-user': 'user'}
    const res = (() => {
      let res: any = {};
      res.status = jest.fn().mockReturnValue(res);
      res.end = jest.fn().mockReturnValue(204);
      
      return res;
    })() as Response;
    test('success TEST', async () => {
      const result = await deleteCategory(req, res, (err: any) => err);

      expect(result).toBe(204);
    });
    test('fail TEST(authorization)', async () => {
      req.headers = {};
      const result = await deleteCategory(req, res, (err: any) => err);

      expect(result).toHaveProperty('msg', 'No Authorization');
      req.headers = { 'x-user': 'user'}
    });
  })
});
