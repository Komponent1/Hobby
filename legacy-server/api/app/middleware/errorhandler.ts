import { Request, Response, NextFunction } from 'express';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.code).json({
    msg: err.err
  });
};
