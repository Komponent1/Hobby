import express from 'express';
import { postLogin, postUser, getRefresh, postGit } from '../controller';

const router = express.Router();
router.use((req, res, next) => {
  next();
});
router.post('/users', postUser);
router.post('/login', postLogin);
router.get('/refresh', getRefresh);
router.post('/git', postGit);

export default router;
