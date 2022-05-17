import express from 'express';
import { fileStream } from '../middleware';
import {  postArticle, getArticle, getCategory, getArticles } from '../controller'

const router = express.Router();
router.use((req, res, next) => {
  next();
})

router.post('/article', fileStream.any(), postArticle);
router.get('/article', getArticle);
router.get('/articles', getArticles);
router.get('/category', getCategory);

export default router;
