import express from 'express';
import { signUp } from '../controller';

const router = express.Router();
router.use((req, res, next) => {
  next();
})

router.get('/', (req, res) => {
  res.send('Hello API Server');
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

export default router;
