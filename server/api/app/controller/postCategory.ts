import { Request, Response, NextFunction } from 'express';
import { ERROR, checkAlreadyIn, authorization } from '../lib';
import { Category } from "../model";

/*
  AUTHORIZATION token
  BODY: user, category_name
  RES:
    200, { category }
  ERORR:
    400, paramter
    401, authentication (in auth)
    403, authorization
    412, category name already in db
    500, DB
*/
const parse = (req: Request) => {
  try {
    const { user, category_name } = req.body;
    const author = req.headers['x-user'] as string;
    
    return { user, author, category_name };
  } catch (err) {
    ERROR.paramError(err);
  }
}
type tAddCatorgory = (category_name: string, user: string) => Promise<any>
export const addCategory: tAddCatorgory = async (category_name, user) => {
  try {
    return await Category.post(user, category_name);
  } catch(err) {
    ERROR.dbError(err);
  }
};
const postCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, author, category_name } = parse(req);
    authorization(user, author);
    await checkAlreadyIn('Category', [user, { category_name }]);
    const category = await addCategory(category_name, user);
    
    return res.status(200).json({ category });
  } catch (err) {
    return next(err);
  }
}

export default postCategory;