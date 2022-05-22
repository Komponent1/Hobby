import express from 'express';
import { postArticle, postCategory } from '../controller';
import { fileStream } from '../middleware';

const router = express.Router();
router.use((req, res, next) => {
  next();
});
router.post('/category', postCategory);
router.post('/article', fileStream.single('file') ,postArticle);

export default router;