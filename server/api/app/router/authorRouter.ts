import express from 'express';
import { deleteCategory, postArticle, postCategory, updateArticle, updateCategory } from '../controller';
import deleteArticle from '../controller/deleteArticle';
import { fileStream } from '../middleware';

const router = express.Router();
router.use((req, res, next) => {
  next();
});
router.post('/category', postCategory);
router.post('/article', fileStream.single('file') ,postArticle);
router.delete('/category', deleteCategory);
router.delete('/article', deleteArticle);
router.patch('/category', updateCategory);
router.patch('/article', fileStream.single('file'), updateArticle);

export default router;