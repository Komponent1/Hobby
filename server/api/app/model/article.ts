import db from './connect';

export const get
= async (
  title: string,
  category_id: string,
  user_email: string
) => {
  return await db.one(
    'SELECT path FROM Article WHERE\
      (title = $1 AND category_id = $2 AND user_email = $3)',
    [title, category_id, user_email]
  );
};

export const post
= async (
  title: string,
  category_id: string,
  user_email: string,
  path: string
) => {
  return await db.none(
    'INSERT INTO Article(title, publish_date, category_id, user_email, path) VALUES($1, $2, $3, $4, $5)',
    [title, new Date().toString(), category_id, user_email, path]
  )
};

export default { get, post };
