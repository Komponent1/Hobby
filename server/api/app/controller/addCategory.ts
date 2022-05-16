import { Category } from "../model";

type tCheckAlreadyIn = (user: string, category_name: string) => Promise<boolean>
const checkAlreadyIn: tCheckAlreadyIn = async (user, category_name)=> {
  try {
    const categories = await Category.get(user, { category_name });
    return (categories.length !== 0);
  } catch(err) {
    /* logger */
    throw ({
      code: 500,
      msg: 'DB server error'
    })
  }
};
type tAddCatorgory = (category_name: string, user: string) => Promise<any>
const addCategory: tAddCatorgory = async (category_name, user) => {
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
    throw ({
      code: 500,
      msg: 'DB server error'
    });
  }
};

export default addCategory;