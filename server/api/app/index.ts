import express from 'express';
import bodyParser from 'body-parser';
import router from './router/router'
import authorRouter from './router/authorRouter';
import logger from 'morgan';
import { errorHandler } from './middleware';

const app = express();
app.use('/public', express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger());
app.use('/api', router);
app.use('/author', authorRouter);
app.use(errorHandler);

const server = app.listen(8003, () => console.log('Connect'));

export default server;
