import { Request, Response } from 'express'
import getArticles from '../controller/getArticles';
import { Article } from '../model';


describe('GET /articles', () => {
  describe('Router TEST', () => {
    type getArticlesQuery = { user: string, category_id?: string, pagination: string, num: string }
    const req = {
      query: { user: 'test_user', category_id: 'test_category_id'}
    } as Request<{}, {}, {}, getArticlesQuery>;
    const res = (() => {
      let res: any = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn(obj => obj);

      return res;
    })() as Response;
    test('success TEST', async () => {
      Article.count = jest.fn().mockReturnValue({ cnt: 5 });
      Article.get = jest.fn().mockReturnValue('article Test');
      
      const result = await getArticles(req, res, (obj:any) => obj) as any;
      
      expect(result).toHaveProperty('count', 5);
      expect(result).toHaveProperty('articles', 'article Test');
    });
    test('fail TEST', async () => {
      Article.count = jest.fn(() => { throw 'err' });
      const result = await getArticles(req, res, (obj:any) => obj) as any;

      expect(result).toHaveProperty('msg', 'Error in DB');
    })
  });
});
