import express from 'express';
import { postCategory } from '../controller';

const router = express.Router();
router.use((req, res, next) => {
  next();
});
router.get('/test', (req, res) => {
  console.log(req.headers)
  console.log(req.body)
  res.send('test clear');
});
router.post('/category', postCategory);

export default router;