import express, { Request, Response, NextFunction } from 'express';
import { login, auth, signUp } from '../controller';
import { makeJwt } from '../controller/login';

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
    const payload = auth(req.headers.authorization.split('Bearer ')[1]);
    req.payload = payload;
    console.log(`Request Auth Success`);
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
    res.cookie('blog_refresh_token', result.refreshToken, {
      maxAge: 60 * 60 * 24 * 30
    });

    return res.status(200).json({
      access_token: result.accessToken,
      token_type: 'Bearer',
      expires_in: 1800,
      scope: 'create'
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
});
router.get('/refresh', (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.cookies.blog_refresh_token) {
      throw ({
        code: 401,
        msg: 'Expire Token'
      });
    }
    const payload = auth(req.cookies.blog_refresh_token);
    const result = makeJwt(payload);

    res.cookie('blog_refresh_token', result.refreshToken, {
      maxAge: 60 * 60 * 24 * 30
    });
    return res.status(200).json({
      access_token: result.accessToken,
      token_type: 'Bearer',
      expires_in: 1800,
      scope: 'create'
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
})

export default router;
