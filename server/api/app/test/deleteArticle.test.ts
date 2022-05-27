import deleteArticle from "../controller/deleteArticle";
import { Request, Response } from 'express';
import { Article } from "../model";
import { file } from '../lib';

describe('DELETE /article', () => {
  describe('Router TEST', () => {
    Article.del = jest.fn().mockReturnValue({ path: 'dir/filename' });
    file.del = jest.fn();

    type deleteArticleQuery = { user: string, article_id: string }
    const req = {
      query: { user: 'user', article_id: 'test' }
    } as Request<{}, {}, {}, deleteArticleQuery>;
    req.headers = { 'x-user': 'user' };
    const res = (() => {
      let res: any = {};
      res.status = jest.fn().mockReturnValue(res);
      res.end = jest.fn().mockReturnValue(204);

      return res;
    })() as Response;

    test('success TEST', async () => {
      const result = await deleteArticle(req, res, (err:any) => err);

      expect(result).toBe(204);
    });
    test('fail TEST(file error)', async () => {
      file.del = jest.fn(() => { throw ({ code: 500, msg: 'err' }) });
      const result = await deleteArticle(req, res, (err:any) => err);

      expect(result).toHaveProperty('msg', 'err');
      file.del = jest.fn();
    });
    test('fail TEST(db error)', async () => {
      Article.del = jest.fn(() => { throw 'err' });
      const result = await deleteArticle(req, res, (err:any) => err);

      expect(result).toHaveProperty('msg', 'Error in DB');
      Article.del = jest.fn().mockReturnValue({ path: 'dir/filename' });
    });
    test('fail TEST(auth error)', async () => {
      req.headers = {};      
      const result = await deleteArticle(req, res, (err:any) => err);

      expect(result).toHaveProperty('msg', 'No matched author with blog owner');
      req.headers = { 'x-user': 'user' };
    });

  });
});
