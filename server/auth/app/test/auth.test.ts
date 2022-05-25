import { Request, Response, NextFunction } from 'express';
import { auth } from '../controller';
import { makeJwt } from '../lib';

describe('GET /', () => {
  const jwt = makeJwt('seo2im').accessToken;
  const req = {
    headers: {
      authorization: `Bearer ${jwt}`
    }
  } as Request;
  const res = (() => {
    let res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.header = jest.fn((key, payload) => {
      res[key] = payload;

      return res;
    })
    res.end = jest.fn().mockReturnValue(res);
    
    return res;
  })();

  describe('Router TEST', () => {
    test('success TEST', () => {
      const result = auth(req, res, (err:any) => err);
      
      expect(result).toHaveProperty('x-user', 'seo2im');
    });

    test('fail TEST (No headers)', () => {
      req.headers = {};
      const result = auth(req, res, (err:any) => err);
      expect(result).toHaveProperty('msg', 'no token');
    });

    // test('fail TEST (No)', () => {
    //   const req = {
    //     headers: {
    //       authorization: `Bearer 12312421`
    //     }
    //   } as Request;
    //   const result = auth(req, res, next) as any;
    //   expect(result).toBe('invalid token');
    // });
  });  
});
