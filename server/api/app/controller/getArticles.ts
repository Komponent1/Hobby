import { Request, Response, NextFunction } from 'express';
import { ERROR } from '../lib';
import { Article } from "../model";

/*
  QUERY: user, category_id?, pagination, num
  RES:
    200, { count, articles }
  ERROR:
    400, paramter
    500, db error
*/
type getArticlesQuery = { user: string, category_id?: string, pagination: string, num: string }
const parse = (req: Request<{}, {}, {}, getArticlesQuery>) => {
  try {
    const { user, category_id, pagination, num } = req.query;

    return { user, category_id, pagination, num };
  } catch (err) {
    ERROR.paramError(err);
  };
};
const getCount = async (user: string, category_id?: string): Promise<{ cnt: string }> => {
  try {
    const count = category_id ? await Article.count(undefined, category_id) : await Article.count(user);

    return count;
  } catch (err) {
    ERROR.dbError(err);
  };
};
const dataFromDB = async (user: string, category_id: string, pagination: string, num: string): Promise<any> => {
  try {
    const articles = await Article.get({ user, category_id }, { id: pagination, num: num });

    return articles;
  } catch(err) {
    if (err.code === 0) return [];
    else ERROR.dbError(err);
  }
};

const getArticles = async (req: Request<{}, {}, {}, getArticlesQuery>, res: Response, next: NextFunction) => {
  let count = null;
  try {
    const { user, category_id, pagination, num } = parse(req);
    count = await getCount(user, category_id);
    const articles = await dataFromDB(user, category_id, pagination, num);
    
    return res.status(200).json({ count: parseInt(count.cnt), articles });
  } catch(err) {
    return next(err);
  }
};

export default getArticles;
