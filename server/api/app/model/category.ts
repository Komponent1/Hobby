import db from './connect';

type CategoryGetFunction = (
  user_email: string,
  option?: {
    category_id?: string
    category_name?: string
  }
) => Promise<any[] | any>
export const get: CategoryGetFunction = async (user_email, option) => {
  let query = 'SELECT * FROM Category WHERE';
  let data = null;

  if (option?.category_id) {
    query += ' ID = $1';
    data = [option.category_id];
  } else if (option?.category_name) {
    query += ' user_email = $1 AND name = $2';
    data = [user_email, option.category_name];
  } else {
    query += ' user_email = $1';
    data = [user_email];
  }

  return await db.many(query, data);
};
type CategoryPostFunction = (
  user_email: string,
  category_name: string
) => Promise<any>
export const post: CategoryPostFunction = async (user_email, category_name) => {
  return await db.one('INSERT INTO Category(name, user_email) VALUES($1, $2) RETURNING *', [category_name, user_email]);
};

export default { get, post };
