import { Request, Response, NextFunction } from 'express';
import { auth } from '../controller';
import { makeJwt } from '../controller/login';

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn((obj) => obj.msg)
  return res;
}

describe('Auth Test', () => {
  const jwt = makeJwt('seo2im6492@gmail.com').accessToken;
  const res = mockResponse() as Response;
  const next = (() => 'authorization') as NextFunction;

  test('Clear', () => {
    const req = {
      headers: {
        authorization: `Bearer ${jwt}`
      }
    } as Request;
    auth(req, res, next);
    expect(req.payload.email).toMatch('seo2im6492@gmail.com');
  });

  /* ...하는법 모르겠음 */
  // test('Expire', () => {
    
  //   const result = auth(req, res, next) as any;
  // });

  /*  */
  test('Invalid', () => {
    const req = {
      headers: {
        authorization: `Bearer 12312421`
      }
    } as Request;
    const result = auth(req, res, next) as any;
    expect(result).toBe('invalid token');
  });
});
