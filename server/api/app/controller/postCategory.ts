import { Request, Response, NextFunction } from 'express';
import { Category } from "../model";

type tCheckAlreadyIn = (user: string, category_name: string) => Promise<boolean>
export const checkAlreadyIn: tCheckAlreadyIn = async (user, category_name)=> {
  try {
    const categories = await Category.get(user, { category_name });
    return true;
  } catch(err) {
    /* logger */
    if (err.code  === 0) { /* Check connection not work */
      return false;
    }
    throw ({
      code: 500,
      msg: 'DB server error'
    })
  }
};
type tAddCatorgory = (category_name: string, user: string) => Promise<any>
export const addCategory: tAddCatorgory = async (category_name, user) => {
  try {
    if (await checkAlreadyIn(user, category_name)) throw({
      code: 400,
      msg: 'Already category name'
    })
  } catch (err) {
    throw err;
  }

  try {
    return await Category.post(user, category_name);
  } catch(err) {
    console.log(err)
    throw ({
      code: 500,
      msg: 'DB server error'
    });
  }
};
const postCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, category_name } = req.body;
    const author = req.headers['x-user'];

    /* client is not blog owner */
    if (user !== author) return next(({
      code: 401,
      msg: 'No match client with blog owner',
    }));

    const new_category = await addCategory(category_name, user);
    return res.status(200).json({
      category: new_category
    });
  } catch (err) {
    return next(err)
  }
}

export default postCategory;