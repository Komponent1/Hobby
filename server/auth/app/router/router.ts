import express from 'express';

const router = express.Router();
router.use((req, res, next) => {
  next();
})

router.get('/', (req, res) => {
  res.send('Hello Auth Server')
});
router.get('/auth/login', (req, res) => {

});
router.get('/auth/')

export default router;
