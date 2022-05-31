import { Request, Response, NextFunction } from 'express';
import { Category } from '../model';
import { authorization } from '../lib';

type deleteCategoryQuery = { user: string, category_id: string }
type tParse = (req: Request<{}, {}, {}, deleteCategoryQuery>) => ({ user: string, author: string, category_id: string })
const parse: tParse = (req) => {
  try {
    const author = req.headers['x-user'] as string;
    const { user, category_id } = req.query;

    return { user, author, category_id };
  } catch (err) {
    console.log('ERROR LOG(parse)', err);
    throw ({
      code: 500,
      msg: 'No correct parameter'
    })
  }
}
const delCategory = async (category_id: string) => {
  try {
    await Category.del(category_id);
  } catch(err) {
    console.log('ERRORLOG(DB)', err);
    console.log(err.code, typeof(err.code))
    if (err.code === '23503') {
      throw ({
        code: 501,
        msg: 'Category have articles'
      })
    }
    throw ({
      code: 500,
      msg: 'Error in DB'
    })
  }

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
