import { Request, Response, NextFunction } from 'express';
import { ERROR } from '../lib';
import db from '../model/connect';

/*
  QUERY: user, category_id?, pagination, num
  RES:
    200, { count, articles }
  ERROR:
    400, paramter
    500, db error
*/
const dataFromDB = async (): Promise<any> => {
  try {
    const raw = await db.many(
      'SELECT article.id, title, publish_date, update_date, src, user_id, tag.id AS tag_id, tag.name AS name, tag.color AS tag_color FROM article INNER JOIN article_tag ON article.ID = article_tag.article_id INNER JOIN tag ON article_tag.tag_id = tag.id ORDER BY article.id',
    )
    const keySet = new Set(raw.map(e => e.id));
    const articles = [...keySet].map((key) => {
      const values = raw.filter(r => r.id === key);
      return { ...values[0], tag: values.map(r => ({ id: r.tag_id, name: r.name, color: r.tag_color})) }
    })
    
    return articles;
  } catch(err) {
    if (err.code === 0) return [];
    else ERROR.dbError(err);
  }
};

type Query = { email: string; };
const getArticles = async (req: Request<{}, {}, {}, Query>, res: Response, next: NextFunction) => {
  try {
    const articles = await dataFromDB();

    return res.status(200).json({ articles });
  } catch(err) {
    return next(err);
  }
};

export default getArticles;
