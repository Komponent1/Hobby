import { Request, Response, NextFunction } from 'express';
import { file, authorization, ERROR } from '../lib';
import { Article } from '../model';

/*
  AUTHORIZATION token
  QUERY: user, article_id
  RES:
    204, success
  ERROR:
    400, paramter
    401, authentication (in auth)
    403, authorization
    500, DB or File
  ETC:
    파일 삭제에 실패한 경우 관리자를 호출, 직접 삭제요망
*/
type deleteArticleQuery = { user: string, article_id: string }
type tParse = (req: Request<{}, {}, {}, deleteArticleQuery>) => ({ user: string, author: string, article_id: string });
const parse: tParse = (req) => {
  try {
    const author = req.headers['x-user'] as string;
    const { user, article_id } = req.query;

    return { user, author, article_id }
  } catch (err) {
    ERROR.paramError(err);
  }
}
type tGetPath = (article_id: string) => Promise<string>
const deleteDB: tGetPath = async (article_id) => {
  try {
    const { path } = await Article.del(article_id) as any;

    return path as string;
  } catch (err) {
    ERROR.dbError(err);
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
    /* File의 삭제는 별도로 관리 */
    deleteFile(path).catch(err => {
      console.log('ERROR LOG(file del)', 'call adminisrator');
    });

    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
};

export default deleteArticle;
