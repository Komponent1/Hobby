import express from 'express';

const router = express.Router();
router.use((req, res, next) => {
  next();
})

router.get('/', (req, res) => {
  res.send('Hello API Server');
});
router.get('/test', (req, res) => {
  console.log(req.payload);
  res.send('clear');
})

export default router;
