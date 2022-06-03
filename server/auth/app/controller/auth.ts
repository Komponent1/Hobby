import { Request, Response, NextFunction } from 'express';
import { authorization, ERROR } from '../lib';
/*
  AUTHORIZATION token
  RES:
    204, success
  ERROR:
    400, no auth header
    403, authentication 
*/
const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      ERROR.paramError('No authorization header');
    }
    const payload = authorization(req.headers.authorization.split('Bearer ')[1]);

    return res.status(204).header('x-user', payload).end();
  } catch(err) {
    return next(err);
  }
};

export default auth;
