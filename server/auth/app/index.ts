import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import router from './router/router'
import { errorHandler } from './middleware';

const app = express();
app.use('/public', express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth', router);
app.use(errorHandler);

app.listen(8001, () => console.log('Connect'));
