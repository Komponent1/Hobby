import { updateArticle } from "../controller";
import { Request, Response } from 'express';
import { Article, Category } from "../model";
import { file } from "../lib";

describe('UPDATE /article', () => {
  describe('Router TEST', () => {
    Article.patch = jest.fn().mockReturnValue('somesome');
    Article.get = jest.fn().mockReturnValue({ title: 'title', path: 'dir/filename' });
    file.send = jest.fn();
    file.del = jest.fn(() => new Promise((res) => res()));
    
    type updateArticleQuery = { user: string, article_id: string }
    const req = {
      query: { user: 'user', article_id: 'test_id'},
      file: { buffer: Buffer.from('test file', 'utf-8'), originalname: 'string' }
    } as Request<{}, {}, {}, updateArticleQuery>;
    req.headers = { 'x-user': 'user'}
    const res = (() => {
      let res: any = {};
      
      res.header = null;
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn((obj: any) => res.header = obj);
      
      return res;
    })() as Response;

    test('success TEST', async () =>{
      const result = await updateArticle(req, res, (err: any) => err);

      expect(result).toMatch('success');
      expect(res.header).toHaveProperty('article', 'somesome')
    });
    test('sucess TEST(file delete fail)', async () => {
      file.del = jest.fn(() => new Promise((resolve, reject) => reject('err')));
      const result = await updateArticle(req, res, (err: any) => err);

      expect(result).toMatch('success');
      expect(res.header).toHaveProperty('article', 'somesome')
      file.del = jest.fn(() => new Promise((res) => res()));
    });
    test('fail TEST(patch fail)', async () => {
      Article.patch = jest.fn(() => new Promise((res, rej) => rej('error')));
      const result = await updateArticle(req, res, (err: any) => err);

      expect(result).toHaveProperty('msg', 'Error in DB');
      Article.patch = jest.fn().mockReturnValue('somesome');
    });
    test('fail TEST(file delete error when db error)', async () => {
      Article.patch = jest.fn(() => new Promise((res, rej) => rej('error')));
      file.del = jest.fn(() => new Promise((resolve, reject) => reject('err')));
      const result = await updateArticle(req, res, (err: any) => err);

      expect(result).toHaveProperty('msg', 'Error in DB');
      Article.patch = jest.fn().mockReturnValue('somesome');
      file.del = jest.fn(() => new Promise((res) => res()));
    });
    test('fail TEST(file sending error)', async () => {
      file.send = jest.fn(() => new Promise((res, rej) => rej('err')));
      const result = await updateArticle(req, res, (err: any) => err);

      expect(result).toMatch('err');
      file.send = jest.fn();
    });
    test('fail TEST(get file)', async () => {
      Article.get = jest.fn(() => new Promise((res, rej) => rej('err')));
      const result = await updateArticle(req, res, (err: any) => err);

      expect(result).toHaveProperty('msg', 'Error in DB');
      Article.get = jest.fn().mockReturnValue({ title: 'title', path: 'dir/filename' });
    });
    test('fail TEST(authorization)', async () => {
      req.headers = {};
      const result = await updateArticle(req, res, (err: any) => err);

      expect(result).toHaveProperty('msg', 'No matched author with blog owner');
      req.headers = { 'x-user': 'user' };
    });
  })
});