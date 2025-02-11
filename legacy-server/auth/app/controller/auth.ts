import { Request, Response, NextFunction } from 'express';
import { authorization, ERROR } from '../lib';
import db from '../model/connect';
/*
  AUTHORIZATION token
  RES:
    204, success
  ERROR:
    400, no auth header
    403, authentication 
*/
type Query = { article_id?: string }
const parse = (req: Request<{}, {}, {}, Query>) => {
  try {
    const { article_id } = req.query;

    return { article_id };
  } catch (err) {
    return { article_id: undefined };
  }
};
const dataFromDB = async (article_id: string) => {
  try {
    return await db.one('SELECT user_id FROM article WHERE article_id = $1',
    [parseInt(article_id)]);
  } catch (err) {
    ERROR.dbError(err);
  }
}
const auth = async (req: Request<{}, {}, {}, Query>, res: Response, next: NextFunction) => {
  try {
    if (!req.cookies.seolim_blog_access_token) {
      ERROR.paramError('No authorization header');
    }
    
    const { article_id } = parse(req);
    const payload = authorization(req.cookies.seolim_blog_access_token);

    if (article_id) {
      const { user_id } = await dataFromDB(article_id);
      if (payload !== user_id) ERROR.authError("INVALID PERMIT");
    }
    return res.status(204).header('x-user', payload).end();
  } catch(err) {
    return next(err);
  }
};

export default auth;
