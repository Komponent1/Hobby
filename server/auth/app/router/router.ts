import express from 'express';

const router = express.Router();
router.use((req, res, next) => {
  next();
})

router.get('/', (req, res) => {
  res.send('Hello Auth Server')
});

export default router;
