import { Request, Response, NextFunction } from 'express';
import { authorization } from '../lib';

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      console.log('ERROR LOG(request check)', req)
      throw ({
        code: 401,
        msg: 'no token'
      });
    }
    console.log(req.headers.authorization);
    const payload = authorization(req.headers.authorization.split('Bearer ')[1]);
    return res.status(204).header('x-user', payload).end();
  } catch(err) {
    console.log(err);
    return next(err);
  }
};

export default auth;
