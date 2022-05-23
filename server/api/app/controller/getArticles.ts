import { Request, Response, NextFunction } from 'express';
import { Article } from "../model";

type getArticlesQuery = { user: string, category_id?: string, pagination: string, num: string }
const getArticles = async (req: Request<{}, {}, {}, getArticlesQuery>, res: Response, next: NextFunction) => {
  try {
    const { user, category_id, pagination, num } = req.query;
    const count = await Article.count(user, category_id);
    const articles = await Article.get({ user, category_id }, { id: parseInt(pagination), num: parseInt(num) });

    return res.status(200).json({ count: count.cnt, articles });
  } catch(err) {
    console.log(err)
    if (err.code === 0) {
      return res.status(200).json({
        articles: []
      })
    }
    next({
      code: 500,
      msg: 'Error in DB'
    });
  }
};

export default getArticles;
