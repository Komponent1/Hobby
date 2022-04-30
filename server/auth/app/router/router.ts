import express, { Request, Response, NextFunction } from 'express';
import { login, auth, signUp } from '../controller';

const router = express.Router();
router.use((req, res, next) => {
  next();
})

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) throw ({
      code: 401,
      msg: 'no token'
    });
    const payload = auth(req.headers.authorization);
    req.payload = payload;
    res.status(200).end();
  } catch(err) {
    console.log(err);
    next(err);
  }
});
router.post('/users', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await signUp(email, password);
    
    return res.status(204).end()
  } catch (err) {
    next(err);
  }
});
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await login(email, password);
    return res.status(200).json({
      access_token: result.accessToken,
      token_type: 'Bearer',
      expires_in: 1800,
      refresh_token: result.refreshToken,
      scope: 'create'
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
});

export default router;
