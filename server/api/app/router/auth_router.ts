import express, { Request, Response, NextFunction } from 'express';
import { addCategory } from '../controller';

const router = express.Router();
router.use((req, res, next) => {
  next();
});
router.get('/test', (req, res) => {
  res.send('test clear');
});
router.post('/category', async (req: Request, res: Response, next: NextFunction) => {
  const { user, category_name } = req.body;
  const author = req.header['X-User'];

  /* client is not blog owner */
  if (user !== author) return next(({
    code: 401,
    msg: 'No match client with blog owner',
  }));

  try {
    const new_category = await addCategory(category_name, user);
    res.status(200).json(new_category);
  } catch (err){
    return next(err);
  }
});

export default router;