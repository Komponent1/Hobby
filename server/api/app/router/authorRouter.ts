import express from 'express';
import { postCategory } from '../controller';

const router = express.Router();
router.use((req, res, next) => {
  next();
});
router.post('/category', postCategory);

export default router;