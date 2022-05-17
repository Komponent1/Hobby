import { Request, Response, NextFunction } from 'express';
import { Category } from '../model';

type getCategoryQuery = { user: string };
const getCategory = async (req: Request<{}, {}, {}, getCategoryQuery>, res: Response, next: NextFunction) => {
  try {
    const { user } = req.query;

    const categories = await Category.get(user);
    return res.status(200).json({
      categories
    });
  } catch(err) {
    return next({
      code: 500,
      msg: 'Error in DB'
    });
  };
};

export default getCategory;
