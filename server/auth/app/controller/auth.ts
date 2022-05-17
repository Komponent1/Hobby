import { Request, Response, NextFunction } from 'express';
import { authorization } from '../lib';

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) throw ({
      code: 401,
      msg: 'no token'
    });
    const payload = authorization(req.headers.authorization.split('Bearer ')[1]);
    res.status(204).header('x-user', payload).end();
  } catch(err) {
    console.log(err);
    next(err);
  }
};

export default auth;
