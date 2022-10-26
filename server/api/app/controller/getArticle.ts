import { Request, Response, NextFunction } from 'express';
import { Writable } from 'stream';
import { Article } from "../model";
import { ERROR, file } from '../lib';
import db from '../model/connect';
/*
  QUERY: article_id
  RES:
    200, { artilc: { title, id, category_id, content } }
  ERORR:
    400, paramter
    500, DB or File
*/
type getArticleQuery = { article_id: string }
const parse = (req: Request<{}, {}, {}, getArticleQuery>) => {
  try {
    const { article_id } = req.query;
    return { article_id };
  } catch(err) {
    ERROR.paramError(err);
  };
};
const dataFromDB = async (article_id: string): Promise<any> => {
  try {
    const raw = await db.many(
      'SELECT article.id, path, title, update_date, src, user_id, tag.id AS tag_id, tag.name AS name, tag.color AS tag_color FROM article INNER JOIN article_tag ON article.ID = article_tag.article_id INNER JOIN tag ON article_tag.tag_id = tag.id WHERE article.id = $1' ,
      [article_id]
    )
    const article = { ...raw[0], tag: raw.map((r) => ({ id: r.tag_id, name: r.name, color: r.tag_color })) };
    const user = await db.one('SELECT src FROM users WHERE id = $1', [article.user_id]);
    return ({ article, user });
  } catch(err) {
    ERROR.dbError(err);
  };
};
const getFile = async (path: string): Promise<any> => {
  let result = '';
  const stream = new Writable({
    write(chunk, encoding, callback) {
      result += chunk.toString();
      callback();
    }
  });
  /* load file */
  await file.load(path, stream);
  return result;
};
const getArticle = async (req: Request<{}, {}, {}, getArticleQuery>, res: Response, next: NextFunction) => {
  try {
    const { article_id } = parse(req);
    const { article, user } = await dataFromDB(article_id) as any;
    const content = await getFile(article.path);

    console.log(content);
    
    return res.status(200).json({ article, user, content });
  } catch (err) {
    return next(err);
  }
};

export default getArticle;
