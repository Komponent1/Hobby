import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();
router.use((req, res, next) => {
  next();
});

router.get('/test', (req, res) => {
  res.send('test clear');
});

export default router;