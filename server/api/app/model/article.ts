import db from './connect';

type tCount = (user?: string, category_id?: string) => Promise<any>
export const count: tCount = (user, category_id) => {
  let query = 'SELECT COUNT(*) as cnt FROM Article WHERE ';
  
  if (user) {
    return db.one(query + 'user_email = $1', [ user ]);
  } else {
    return db.one(query + 'category_id = $1', [ category_id ])
  }
};
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
    query += `ORDER BY id DESC OFFSET ${pagination.id * pagination.num} limit ${pagination.num}`;
  }

  return await db.many(query, data);
};

type ArticlePostFunction = (
  title: string,
  category_id: string,
  user_email: string,
  path: string
) => Promise<any>
export const post: ArticlePostFunction = async (title, category_id, user_email, path) => {
  return await db.one(
    'INSERT INTO Article(title, publish_date, update_date, category_id, user_email, path) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    [title, new Date().toString(), new Date().toString(), category_id, user_email, path]
  )
};
type ArticleDeleteFunction = (article_id: string) => Promise<any>
export const del: ArticleDeleteFunction = async (article_id) => {
  return await db.one('DELETE FROM Article WHERE ID = $1 RETURNING *', [article_id])
};
type ArticlePatchFunction = (article_id: string, title?: string, user?: string) => Promise<any>;
export const patch: ArticlePatchFunction = async (article_id, title, user) => {
  let i = 1;
  let data = [new Date().toString()];
  let sql = 'UPDATE Article SET update_date = $1';

  if (title) {
    sql += `, title = $${++i}, path = $${++i}`
    data = [...data, title, `${user}/${title}`];
  }

  sql += ` WHERE ID = $${++i} RETURNING *`;
  console.log(sql)
  return await db.one(sql, [...data, article_id]);
};

export default { get, post, count, del, patch };
