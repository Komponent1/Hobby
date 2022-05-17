import db from './connect';

type CategoryGetFunction = (
  user_email: string,
  option?: {
    category_id?: string
    category_name?: string
  }
) => Promise<any[] | any>
export const get: CategoryGetFunction = async (user_email, option) => {
  if (option?.category_id) {
    return await db.many('SELECT * FROM Category WHERE category_id = $1', [option.category_id]);
  } else if (option?.category_name) {
    return await db.many('SELECT * FROM Category WHERE user_email = $1 AND name = $2', [user_email, option.category_name]);
  } else {
    return await db.many('SELECT * FROM Category WHERE user_email = $1', [user_email]);
  }
};
type CategoryPostFunction = (
  user_email: string,
  category_name: string
) => Promise<any>
export const post: CategoryPostFunction = async (user_email, category_name) => {
  return await db.one('INSERT INTO Category(name, user_email) VALUES($1, $2) RETURNING *', [category_name, user_email]);
};

export default { get, post };
