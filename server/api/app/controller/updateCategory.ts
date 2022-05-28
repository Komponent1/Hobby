import { Request, Response, NextFunction } from 'express';
import { authorization, checkAlreadyIn } from '../lib';
import { Category } from '../model';


type tParse = (req: Request) => ({ author: string, user: string, category_id: string, category_name: string });
const parse: tParse = (req) => {
  try {
    const author = req.headers['x-user'] as string;
    const { user, category_id, category_name } = req.body;
    
    return { author, user, category_id, category_name };
  } catch (err) {
    console.log('ERROR LOG(parse)', err);
    throw ({
      code: 500,
      msg: 'No correct parameter'
    })
  }
};
type tPatchCategory = (category_id: string, category_name: string) => Promise<any>
const patchCategory: tPatchCategory = async (category_id, category_name) => {
  try {
    return await Category.patch(category_id, category_name);
  } catch(err) {
    console.log('ERROR LOG(DB)', err);
    throw({
      code: 500,
      msg: 'Error in DB'
    })
  };
};
const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { author, user, category_id, category_name } = parse(req);
    authorization(author, user);
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
