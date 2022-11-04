import express from 'express';
import { fileStream } from '../middleware';
import {  postArticle, getArticle, getCategory, getArticles, getImages, getOgTable, getComments } from '../controller'
import getTags from '../controller/getTags';

const router = express.Router();
router.use((req, res, next) => {
  next();
})

router.post('/article', fileStream.any(), postArticle);
router.get('/article', getArticle);
router.get('/articles', getArticles);
router.get('/category', getCategory);
router.get('/tags', getTags);
router.get('/images', getImages);
router.get('/bookmark', getOgTable);
router.get('/comment', getComments);

export default router;
