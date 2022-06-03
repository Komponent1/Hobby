import { Request, Response, NextFunction } from 'express';
import { Category } from '../model';
import { ERROR } from '../lib';
/*
  QUERY: user
  RES:
    200, { categories }
  ERROR:
    400: param error
    500, db error
*/
type getCategoryQuery = { user: string };
const parse = (req: Request<{}, {}, {}, getCategoryQuery>) => {
  try {
    const { user } = req.query;

    return { user };
  } catch (err) {
    ERROR.paramError(ERROR); 
  }
};
const dataFromDB = async (user: string) => {
  try {
    const categories = await Category.get(user);

    return categories;
  } catch (err) {
    if (err.code === 0) {
      return [];
    } else {
      ERROR.dbError(err)
    }
  }
};
const getCategory = async (req: Request<{}, {}, {}, getCategoryQuery>, res: Response, next: NextFunction) => {
  try {
    const { user } = parse(req);
    const categories = await dataFromDB(user);
    return res.status(200).json({
      categories: categories
    });
  } catch(err) {
    return next(err);
  };
};

export default getCategory;
