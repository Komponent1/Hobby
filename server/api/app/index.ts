import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import router from './router/router'
import authorRouter from './router/authorRouter';
import logger from 'morgan';
import { errorHandler } from './middleware';
import cors from 'cors';

const app = express();
app.use('/public', express.static(`${__dirname}/public`));
process.env.NODE_ENV === 'development' ? null : app.use(cors({
  origin: 'https://blog-sage-pi.vercel.app',
  credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger());
app.use('/api', router);
app.use('/author', authorRouter);
app.use(errorHandler);


const server = app.listen(8003, () => console.log('Connect'));

export default server;
