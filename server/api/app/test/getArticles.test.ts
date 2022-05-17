import { Request, Response } from 'express'
import getArticles from '../controller/getArticles';

describe('get /articles', () => {
  const req = {

  } as Request;
  const res = (() => {
    let res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn(obj => obj);
  })();
  describe('Router Test', () => {
    test('Normal Test', () => {
      
    });
  });
});