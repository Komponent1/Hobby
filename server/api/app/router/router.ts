import express, { Request, Response, NextFunction } from 'express';
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
type Query = {
  user: string, filename: string, category: string
};
router.post('/article', fileStream.any(), async (req: Request<{}, {}, {}, Query>, res: Response, next: NextFunction) => {
  try {
    const { user, category }: { user: string, filename: string, category: string } = req.query;
    const { buffer, originalname } = req.files[0];
    
    await post(user, category, originalname, buffer);
    

    return res.status(204).end();
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default router;
