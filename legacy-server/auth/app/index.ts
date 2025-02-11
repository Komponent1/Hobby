import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import signRouter from './router/signRouter'
import authRouter from './router/authRotuer'
import { errorHandler } from './middleware';
import cors from 'cors';

const app = express();

app.use('/public', express.static(`${__dirname}/public`));
process.env.NODE_ENV === 'development' ? null : app.use(cors({
  origin: 'https://blog-sage-pi.vercel.app',
  credentials: true,
}));
app.use(cookieParser());
app.use(logger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/sign', signRouter);
app.use('/auth', authRouter);
app.use(errorHandler);

app.listen(8001, () => console.log('Connect'));
