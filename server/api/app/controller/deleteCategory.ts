import { Request, Response, NextFunction } from 'express';
import { Category } from '../model';
import { authorization, ERROR } from '../lib';
/*
  AUTHORIZATION token
  QUERY: user, category_id
  RES:
    204, success
  ERROR:
    400, parameter
    401, authentication (in auth)
    403, authorization
    412, category have articles
    500, DB
*/
type deleteCategoryQuery = { user: string, category_id: string }
type tParse = (req: Request<{}, {}, {}, deleteCategoryQuery>) => ({ user: string, author: string, category_id: string })
const parse: tParse = (req) => {
  try {
    const author = req.headers['x-user'] as string;
    const { user, category_id } = req.query;

    return { user, author, category_id };
  } catch (err) {
    ERROR.paramError(err);
  }
}
const delCategory = async (category_id: string) => {
  try {
    await Category.del(category_id);
  } catch(err) {
    if (err.code === '23503') {
      ERROR.refError(err);
    };
    ERROR.dbError(err);
  };
}
const deleteCategory = async (req: Request<{}, {}, {}, deleteCategoryQuery>, res: Response, next: NextFunction) => {
  try {
    const { user, author, category_id } = parse(req);
    authorization(user, author);
    await delCategory(category_id);
    
    return res.status(204).end();
  } catch(err) { 
    return next(err);
  }
};

export default deleteCategory;
