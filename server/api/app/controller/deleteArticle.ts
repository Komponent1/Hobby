import { Request, Response, NextFunction } from 'express';
import { file, authorization } from '../lib';
import { Article } from '../model';

type deleteArticleQuery = { user: string, article_id: string }
type tParse = (req: Request<{}, {}, {}, deleteArticleQuery>) => ({ user: string, author: string, article_id: string });
const parse: tParse = (req) => {
  try {
    const author = req.headers['x-user'] as string;
    const { user, article_id } = req.query;

    return { user, author, article_id }
  } catch (err) {
    console.log('ERROR LOG(parse)', err);
    throw ({
      code: 500,
      msg: 'No correct parameter'
    })
  }
}
type tGetPath = (article_id: string) => Promise<string>
const deleteDB: tGetPath = async (article_id) => {
  try {
    const { path } = await Article.del(article_id) as any;

    return path as string;
  } catch (err) {
    console.log('ERROR LOG(DB, get)', err);

    throw ({
      code: 500,
      msg: 'Error in DB'
    })
  };
};
type tDeleteFile = (path: string) => Promise<void>
const deleteFile: tDeleteFile = async (path) => {
  try {
    const [ user, filename ] = path.split('/')
    await file.del(user, filename);
  } catch(err) {
    throw(err);
  }
};
const deleteArticle = async (req: Request<{}, {}, {}, deleteArticleQuery>, res: Response, next: NextFunction) => {
  try {
    const { user, author, article_id } = parse(req);
    authorization(user, author);

    const path = await deleteDB(article_id);
    await deleteFile(path);

    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
};

export default deleteArticle;
