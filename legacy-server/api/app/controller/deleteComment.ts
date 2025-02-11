import { Request, Response, NextFunction } from 'express';
import { ERROR } from '../lib';
import db from '../model/connect';

type Query = { comment_id: string }
const parse = (req: Request) => {
  try {
    const { comment_id } = req.query;
    const user_id = req.headers['x-user'] as string;

    return { comment_id, user_id };
  } catch(err) {
    ERROR.paramError(err);
  }
};
const deleteFromDB = async (comment_id: string, user_id: string) => {
  try {
    await db.none('DELETE FROM comment WHERE id = $1 AND user_id = $2', [comment_id, user_id])
  } catch(err) {
    ERROR.dbError(err);
  }
};
const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { comment_id, user_id } = parse(req);
    await deleteFromDB(comment_id as string, user_id);

    return res.status(204).end();
  } catch(err) {
    next(err);
  }
};

export default deleteComment;
