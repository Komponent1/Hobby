import { Request, Response, NextFunction } from 'express';
import { authorization, checkAlreadyIn, ERROR } from '../lib';
import { Category } from '../model';
/*
  AUTHORIZATION token
  BODY: user, category_id, category_name
  RES:
    200, { category }
  ERORR:
    400, paramter
    401, authentication (in auth)
    403, authorization
    412, category name already in db
    500, DB
*/
type tParse = (req: Request) => ({ author: string, user: string, category_id: string, category_name: string });
const parse: tParse = (req) => {
  try {
    const author = req.headers['x-user'] as string;
    const { user, category_id, category_name } = req.body;
    
    return { author, user, category_id, category_name };
  } catch (err) {
    ERROR.paramError(err);
  }
};
type tPatchCategory = (category_id: string, category_name: string) => Promise<any>
const patchCategory: tPatchCategory = async (category_id, category_name) => {
  try {
    return await Category.patch(category_id, category_name);
  } catch(err) {
    ERROR.dbError(err);
  };
};
const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { author, user, category_id, category_name } = parse(req);
    authorization(user, author);
    await checkAlreadyIn('Category', [user, { category_name }]);
    const category = await patchCategory(category_id, category_name);
    
    return res.status(200).json({
      category
    })
  } catch(err) {
    return next(err);
  };
};

export default updateCategory;
