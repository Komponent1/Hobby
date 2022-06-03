import { Request, Response, NextFunction } from 'express';
import { Readable } from 'stream';
import { authorization, ERROR, file, filenaming, splitpath }from '../lib';
import { Article } from '../model';

/*
  AUTHORIZATION token
  QUERY: user, category_id
  BODY: file(x-form-data)
  RES:
    200, { artilc: { title, id, category_id, content } }
  ERORR:
    400, paramter
    401, authentication (in auth)
    403, authorization
    500, DB or File
  ETC:
    파일 삭제에 실패한 경우 관리자를 호출, 직접 삭제요망
*/
type postArticleQuery = { user: string, category_id: string }
const parse = (req: Request<{}, {}, {}, postArticleQuery>) => {
  try {
    const { user, category_id } = req.query;
    const author = req.headers['x-user'] as string;
    const { buffer, originalname } = req.file;

    return { user, category_id, author, buffer, originalname };
  } catch(err) {
    ERROR.paramError(err);
  }
}
type tSavingFile = (filename: string, user: string, buffer: any) => Promise<void>
const savingFile: tSavingFile = async (filename, user, buffer) => {
  const stream = Readable.from(buffer.toString());
  await file.send(user, filename, stream);
};
type tPathupload = (originalname: string, user: string, category_id: string, path: string) => Promise<void>
const pathupload: tPathupload = async (originalname, user, category_id, path) => {
  try {
    return await Article.post(originalname, category_id, user, path);
  } catch(err) {
    console.log('ERROR LOG(DB)', err)
    const [ dir, filename ] = splitpath(path);
    file.del(dir, filename).catch(err => {
      console.log('ERROR LOG(FILE)', '관리자 호출을 요망함')
    });
    ERROR.dbError(err)
  };
};

const postArticle = async (req: Request<{}, {}, {}, postArticleQuery>, res: Response, next: NextFunction) => {
  try {
    const { user, author, category_id, buffer, originalname } = parse(req);
    authorization(user, author);
    const filename = filenaming(originalname);
    await savingFile(filename, user, buffer);
    const article = await pathupload(originalname, user, category_id, `${user}/${filename}`) as any;

    return res.status(200).json({
      article: {
        title: article.title,
        id: article.id,
        category_id: article.category_id,
        content: buffer.toString(),
      }
    });
  } catch (err) {
    return next(err);
  }
}


export default postArticle;
