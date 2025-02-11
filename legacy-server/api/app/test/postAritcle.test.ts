import { Request, Response } from 'express';
import { postArticle } from '../controller';
import { Article } from '../model';
import { file } from '../lib';

describe('POST /article', () => {
  type postArticleQuery = { user: string, category_id: string }
  const req = {
    query: { user: 'seo2im', category_id: '0' },
    file: { buffer: Buffer.from('test file', 'utf-8'), originalname: 'string' }
  } as Request<{}, {}, {}, postArticleQuery>;
  req.headers = { 'x-user': 'seo2im' }
  const res = (() => {
    let res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn((obj: any) => obj);

    return res;
  })();

  
  describe('Router TEST', () => {
    Article.post = jest.fn().mockReturnValue('path upload');
    file.send = jest.fn();
    file.del = jest.fn();
    test('success TEST', async () =>{
      const result = await postArticle(req, res, (err: any) => err) as any;

      expect(result).toHaveProperty('article', 'path upload');
    });

    test('fail TEST (No matched user)', async () => {
      req.headers = { 'x-user': '1234' };

      const result = await postArticle(req, res, (err: any) => err) as any;
      expect(result).toHaveProperty('msg', 'No match client with blog owner');

      req.headers = { 'x-user': 'seo2im' };
    });

    test('fail TEST (DB Post Error)', async () => {
      Article.post = jest.fn(() => { throw 'err' });
      
      const result = await postArticle(req, res, (err: any) => err) as any;
      expect(result).toHaveProperty('msg', 'DB upload error');

      Article.post = jest.fn().mockReturnValue('path upload');
    });

    test('fail TEST (file send error)', async () => {
      file.send = jest.fn(() => { throw ({ code: 500, msg: 'FTP server error' }) });

      const result = await postArticle(req, res, (err: any) => err) as any;
      expect(result).toHaveProperty('msg', 'FTP server error');

      file.send = jest.fn();
    });
  });
})