import { Request, Response, NextFunction } from 'express';
import { Article } from "../model";
import { Writable } from 'stream';
import * as file from '../lib/file';

type getArticlesQuery = { user: string, category_id: string, pagination: string, num: string }
const getArticles = async (req: Request<{}, {}, {}, getArticlesQuery>, res: Response, next: NextFunction) => {
  try {
    const { user, category_id, pagination, num } = req.query;
    const articles = await Article.get(user, { category_id }, { id: parseInt(pagination), num: parseInt(num) });

    res.status(200).json({ articles });
  } catch(err) {
    next({
      code: 500,
      msg: 'Error in DB'
    });
  }
};

export default getArticles;
