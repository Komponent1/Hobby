import express, { Request, Response, NextFunction } from 'express';
import { auth } from '../controller';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) throw ({
      code: 401,
      msg: 'no token'
    });
    const payload = auth(req.headers.authorization.split('Bearer ')[1]);
    res.status(204).header('x-user', payload).end();
  } catch(err) {
    console.log(err);
    next(err);
  }
});

export default router;
