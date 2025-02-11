import express, { Request, Response, NextFunction } from 'express';
import { auth } from '../controller';

const router = express.Router();
router.use((req, res, next) => {
  next();
});
router.get('/', auth);

export default router;
