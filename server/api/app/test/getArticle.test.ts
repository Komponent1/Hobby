import getArticle, { getFile } from '../controller/getArticle';
import { Request, Response } from 'express';
import { Article } from '../model';
import { file } from '../lib';
import { Writable } from 'stream';

describe('GET /article', () => {
  /* global function mocking */
  file.load = jest.fn((path: string, stream: Writable) => {
    stream.write('This is content');
    return Promise.resolve();
  });
  Article.get = jest.fn().mockReturnValue([{ title: 'This is title', path: 'This is path' }])

  describe('Function TEST', () => {
    test('getFile TEST', async () => {
      const path = '';    
      const result = await getFile(path);
      expect(result).toMatch('This is content');
    });
  });

  describe('Router TEST', () => {
    type getArticleQuery = { article_id: string }
    const req = {
      query: { article_id: '1' }
    } as Request<{}, {}, {}, getArticleQuery>
    const res = (() => {
      const res: any = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn((obj: any) => obj);

      return res;
    })() as Response;

    test('success TEST', async () => {      
      const result = await getArticle(req, res, (obj) => obj) as any;
      
      expect(result.article).toHaveProperty('title', 'This is title');
      expect(result.article).toHaveProperty('id', '1');
      expect(result.article).toHaveProperty('content', 'This is content');
    });

    test('fail TEST', async () => {
      Article.get = jest.fn(() => { throw 'err' });
      const result = await getArticle(req, res, (obj) => obj);

      expect(result).toHaveProperty('msg', 'Error in DB');
    })
  });
});