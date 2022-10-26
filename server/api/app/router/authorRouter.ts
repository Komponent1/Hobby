import express from 'express';
import { deleteCategory, postArticle, postCategory, updateArticle, updateCategory, uploadImage } from '../controller';
import deleteArticle from '../controller/deleteArticle';
import { fileStream } from '../middleware';

const router = express.Router();
router.use((req, res, next) => {
  next();
});
router.post('/category', postCategory);
router.post(
  '/article',
  fileStream.fields([
    { name: 'md', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
    { name: 'article', maxCount: 1 },
  ]),
  postArticle,
);
router.delete('/category', deleteCategory);
router.delete('/article', deleteArticle);
router.patch('/category', updateCategory);
router.patch(
  '/article',
  fileStream.fields([
    { name: 'md', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
    { name: 'article', maxCount: 1 },
  ]),
  updateArticle,
);
router.post(
  '/image',
  fileStream.single('file'),
  uploadImage,
);

export default router;
