import { Request, Response, NextFunction } from 'express';
import { ERROR } from '../lib';
import db from '../model/connect';

type Query = { article_id: string }
const parse = (req: Request<{}, {}, {}, Query>) => {
  try {
    const { article_id } = req.query;

    return article_id;
  } catch(err) {
    ERROR.paramError(err);
  }
}
const dataFromDB = async (article_id: string): Promise<any> => {
  try {
    const comments = await db.many(
      'SELECT comment.id as id, content, date, users.id AS user_id, users.src AS user_src FROM comment INNER JOIN users ON users.id = comment.user_id WHERE article_id = $1',
      [parseInt(article_id)]
    );

    return comments;
  } catch(err) {
    if (err.code === 0) return [];
    ERROR.dbError(err);
  }
}
const getComments = async (req: Request<{}, {}, {}, Query>, res: Response, next: NextFunction) => {
  try {
    const article_id = parse(req);
    const comments = await dataFromDB(article_id);

    return res.status(200).json({ comments });
  } catch(err) {
    next(err);
  }
};

export default getComments;
