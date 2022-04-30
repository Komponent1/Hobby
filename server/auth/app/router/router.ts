import express from 'express';
import { login } from '../controller';

const router = express.Router();
router.use((req, res, next) => {
  next();
})

router.get('/', (req, res) => {
  res.send('Hello Auth Server')
});
router.get('/auth/login', async (req, res, next) => {
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
