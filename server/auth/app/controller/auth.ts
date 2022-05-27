import { Request, Response, NextFunction } from 'express';
import { authorization } from '../lib';

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    /* judge preflight (temporary) */
    if (req.method === 'OPTIONS') {
      return res.status(204).end();
    }

    if (!req.headers.authorization) {
      console.log('ERROR LOG(request check)', req)
      throw ({
        code: 401,
        msg: 'no token'
      });
    }
    const payload = authorization(req.headers.authorization.split('Bearer ')[1]);
    return res.status(204).header('x-user', payload).end();
  } catch(err) {
    console.log(err);
    return next(err);
  }
};

export default auth;
