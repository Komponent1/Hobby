import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { devHashKey } from '../controller/login';

const EXPIRE = 'expire';
const INVALID = 'invalid';

type tToken = {
  email: string
}
const decode = (token: string): string => {
  try {
    return (jwt.verify(token, devHashKey.secret) as tToken).email;
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      return EXPIRE;
    } else {
      return INVALID;
    }
  }
};

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  const result = decode(token);
  if (result === EXPIRE) {
    return res.status(401).json({
      msg: 'expire token'
    })
  } else if (result === INVALID){
    return res.status(401).json({
      msg: 'invalid token'
    });
  }
  req.payload = { email: result };
  next();
};

export default authMiddleware;
