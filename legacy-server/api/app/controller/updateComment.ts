import { Request, Response, NextFunction } from 'express';
import { ERROR }from '../lib';
import db from '../model/connect';

type Query = { comment_id: string };
type Body = { content: string };
const parse = (req: Request<{}, {}, Body, Query>) => {
  try {
    const { comment_id } = req.query;
    const { content } = req.body;
    const user_id = req.headers['x-user'] as string;

    return { comment_id, user_id, content };
  } catch(err) {
    ERROR.paramError(err);
  }
}
const updateFromDB = async (comment_id: string, user_id: string, content: string) => {
  try {
    await db.none(
      'UPDATE comment SET content = $1 WHERE id = $2 AND user_id = $3',
      [content, comment_id, user_id],
    );
  } catch(err) {
    ERROR.dbError(err);
  }
}
const updateComment = async (req: Request<{}, {}, Body, Query>, res: Response, next: NextFunction) => {
  try {
    const { user_id, comment_id, content } = parse(req);
    await updateFromDB(comment_id, user_id, content);

    return res.status(204).end();
  } catch(err) {
    next(err);
  }
};
export default updateComment;
