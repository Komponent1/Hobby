import express from 'express';
import { postLogin, postUser, getRefresh } from '../controller';

const router = express.Router();
router.use((req, res, next) => {
  next();
});
router.post('/users', postUser);
router.post('/login', postLogin);
router.get('/refresh', getRefresh);

export default router;
