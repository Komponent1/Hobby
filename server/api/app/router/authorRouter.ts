import express from 'express';
import { deleteComment, getComments, postArticle, postComment, updateArticle, updateComment, uploadImage } from '../controller';
import deleteArticle from '../controller/deleteArticle';
import { fileStream } from '../middleware';

const router = express.Router();
router.use((req, res, next) => {
  next();
});
router.post(
  '/article',
  fileStream.fields([
    { name: 'md', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
    { name: 'article', maxCount: 1 },
  ]),
  postArticle,
);
router.delete('/article', deleteArticle);
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
router.post('/comment', postComment);
router.delete('/comment', deleteComment);
router.patch('/comment', updateComment);

export default router;
