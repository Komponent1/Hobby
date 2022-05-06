import db from './connect';

export const get = async (user_email: string) => {
  if (!user_email || user_email === '') {
    throw ({ code: 500, msg: 'NO user_email DB' });
  } else {
    return await db.any('SELECT * FROM Category WHERE user_email $1', [user_email]);
  }
};
export const post = async (category_name: string, user_email: string) => {
  return await db.none('INSERT INTO Category(name, user_email) VALUES($1, $2)', [category_name, user_email]);
};

export default { get, post };
