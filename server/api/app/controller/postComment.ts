import { Request, Response, NextFunction } from 'express';
import { ERROR } from '../lib';
import db from '../model/connect';

const parse = (req: Request) => {
  try {
    const { content, article_id } = req.body;
    const user_id = req.headers['x-user'] as string;

    return {
      content, user_id, article_id
    }
  } catch (err) {
    ERROR.paramError(err);
  }
}
const insertDB = async (content: string, user_id: string, article_id: string) => {
  try {
    const { id, date } = await db.one(
      `INSERT INTO comment (content, user_id, article_id, date) VALUES ($1, $2, $3, $4)
      RETURNING id, date`,
      [content, user_id, parseInt(article_id), new Date().toString()]
    );

    return { id, date };
  } catch (err) {
    ERROR.dbError(err);
  }
}
const getDataFromDB = async (user_id) => {
  try {
    const { src } = await db.one('SELECT src FROM users WHERE id = $1', [user_id]);

    return src;
  } catch (err) {
    ERROR.dbError(err);
  }
}
const postComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content, user_id, article_id } = parse(req);
    console.log(content, user_id, article_id);
    const { id, date } = await insertDB(content, user_id, article_id);
    const user_src = await getDataFromDB(user_id);

    return res.status(200).json({
      id, content, date, user_id, user_src
    });
  } catch(err) {
    next(err);
  }
}

export default postComment;
