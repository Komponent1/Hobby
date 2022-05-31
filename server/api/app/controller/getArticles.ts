import { Request, Response, NextFunction } from 'express';
import { Article } from "../model";

const getCount = async (user: string, category_id?: string): Promise<{ cnt: string }> => {
  try {
    const count = category_id ? await Article.count(undefined, category_id) : await Article.count(user);

    return count;
  } catch (err) {
    throw ({
      code: 500,
      msg: 'Error in db'
    })
  };
};
type getArticlesQuery = { user: string, category_id?: string, pagination: string, num: string }
const getArticles = async (req: Request<{}, {}, {}, getArticlesQuery>, res: Response, next: NextFunction) => {
  let count = null;
  try {
    const { user, category_id, pagination, num } = req.query;
    count = await getCount(user, category_id);
    const articles = await Article.get({ user, category_id }, { id: parseInt(pagination), num: parseInt(num) });
    
    return res.status(200).json({ count: parseInt(count.cnt), articles });
  } catch(err) {
    if (err.code === 0) {
      return res.status(200).json({
        count: parseInt(count.cnt),
        articles: []
      })
    }
    return next(err);
  }
};

export default getArticles;
