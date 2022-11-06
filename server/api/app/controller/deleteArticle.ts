import { Request, Response, NextFunction } from 'express';
import { ERROR, file } from '../lib';
import db from '../model/connect';

type Query = { article_id: string }
const parse = (req: Request<{}, {}, {}, Query>) => {
  try {
    const { article_id } = req.query;
    const user_id = req.headers['x-user'] as string;
    return { article_id, user_id };
  } catch(err) {
    ERROR.paramError(err);
  };
}
const deleteDataFromDB = async (article_id: string, user_id: string) => {
  console.log(article_id, user_id);
  try {
    await db.none(
      'DELETE FROM article_tag WHERE article_id = $1',
      [parseInt(article_id)],
    )
    const { path } = await db.one(
      'DELETE FROM article WHERE id = $1 AND user_id = $2 RETURNING path',
      [parseInt(article_id), user_id],
    );

    return path;
  } catch(err) {
    ERROR.dbError(err);
  }
}
const deleteFile = async (path) => {
  const [ user, filename ] = path.split('/')
  await file.del(user, filename);
};
const deleteArticle = async (req: Request<{}, {}, {}, Query>, res: Response, next: NextFunction) => {
  try {
    const { article_id, user_id } = parse(req);
    const path = await deleteDataFromDB(article_id, user_id);
    await deleteFile(path);

    return res.status(204).end();
  } catch(err) {
    next(err);
  }
};

export default deleteArticle;
