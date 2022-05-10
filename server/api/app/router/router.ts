import express, { Request, Response, NextFunction } from 'express';
import { fileStream } from '../middleware';
import { postCategory, postArticle, getArticle } from '../controller'

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
type postArticleQuery = {
  user: string, filename: string, category: string
};
router.post('/article', fileStream.any(), async (req: Request<{}, {}, {}, postArticleQuery>, res: Response, next: NextFunction) => {
  try {
    const { user, category } = req.query;
    const { buffer, originalname } = req.files[0];
    
    await postArticle(user, category, originalname, buffer);
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
});
router.post('/category', async (req: Request<{}>, res: Response, next: NextFunction) => {
  try {
    const { user, category_name } = req.body;
    await postCategory(user, category_name);
    res.status(204).end();
  } catch(err) {
    next(err);
  }
});
type getArticleQuery = {
  user: string, category_name: string, title: string
};
router.get('/article', async (req: Request<{}, {}, {}, getArticleQuery>, res: Response, next: NextFunction) => {
  try {
    const { user, category_name, title } = req.query;
    const content = await getArticle(title, category_name, user);
    
    /* sending md file & get file load in client */
    res.status(200).write(content).end();
  } catch (err) {
    next(err);
  };
});

export default router;
