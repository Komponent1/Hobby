import db from './connect';

type tGetArticle = (option: { user?: string, category_id?: string, article_id?: string }, pagination?: { id: number, num: number }) => Promise<any[]>
export const get: tGetArticle = async (option, pagination) => {
  let query = 'SELECT * FROM Article WHERE';
  let data = null;

  if (option?.article_id) {
    query += ' ID = $1';
    data = [option.article_id];
  } else if (option?.category_id) {
    query += ' user_email = $1 AND category_id = $2';
    data = [option.user, option.category_id];
  } else if (option){
    query += ' user_email = $1';
    data = [option.user];
  }

  if (pagination) {
    query += ` OFFSET ${pagination.id} limit ${pagination.num}`;
  }

  return await db.many(query, data);
};

export const post
= async (
  title: string,
  category_id: string,
  user_email: string,
  path: string
) => {
  return await db.one(
    'INSERT INTO Article(title, publish_date, category_id, user_email, path) VALUES($1, $2, $3, $4, $5) RETURNING *',
    [title, new Date().toString(), category_id, user_email, path]
  )
};

export default { get, post };
