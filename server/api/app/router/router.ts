import express from 'express';
import { fileStream } from '../middleware';
import { post } from '../controller'

const router = express.Router();
router.use((req, res, next) => {
  next();
})

router.get('/', (req, res) => {
  return res.send('Hello API Server');
});
router.get('/test', (req, res) => {
  return res.send('clear');
});
router.post('/post', fileStream.any(), async (req, res, next) => {
  try {
    const { user, filename, category } = req.query;
    const { buffer } = req.file;
    await post(user, category, filename, buffer);
    

    return res.status(204).end();
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default router;
