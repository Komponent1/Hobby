import { Request, Response, NextFunction } from 'express';
import { Article } from "../model";
import { Writable } from 'stream';
import { ERROR, file } from '../lib';
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
    const article = (await Article.get({ article_id }))[0];

    return article;
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
    const article = await dataFromDB(article_id) as any;
    const content = await getFile(article.path);
    
    return res.status(200).json({ 
      article: { 
        title: article.title, category_id: article.category_id, id: article_id, content
      }
    });
  } catch (err) {
    return next(err);
  }
};

export default getArticle;
