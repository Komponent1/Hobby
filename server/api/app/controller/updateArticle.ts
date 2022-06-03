import { Request, Response, NextFunction } from 'express';
import { Readable } from 'stream';
import { authorization, ERROR, file, filenaming, splitpath }from '../lib';
import { Article } from '../model';
/*
  AUTHORIZATION token
  QUERY: user, article_id, category_id
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
type updateArticleQuery = { user: string, article_id: string, category_id: string }
const parse = (req: Request<{}, {}, {}, updateArticleQuery>) => {
  try {
    const author = req.headers['x-user'] as string;
    const { user, article_id, category_id } = req.query;
    const { buffer, originalname } = req.file;

    return { author, user, article_id: article_id, category_id: category_id, buffer, originalname };
  } catch (err) {
    ERROR.paramError(err);
  }
};
type tGetPath = (article_id: string) => Promise<{ title: string, path: string }>;
const getFileInformation: tGetPath = async (article_id) => {
  try {
    const { title, path } = (await Article.get({ article_id }) as any[])[0];

    return { title, path };
  } catch (err) {
    ERROR.dbError(err);
  }
};
type tSavingFile = (filename: string, user: string, buffer: any) => Promise<void>
const savingFile: tSavingFile = async (filename, user, buffer) => {
  const stream = Readable.from(buffer.toString());
  await file.send(user, filename, stream);
};
type tPatchArticle = (article_id: string, category_id: string, originalname: string, path: string) => Promise<any>
const patchArticle: tPatchArticle = async (article_id, category_id, originalname, user) => {
  try {
    return await Article.patch(article_id, category_id, originalname, user);
  } catch (err) {
    ERROR.dbError(err);
  }
};

const updateArticle = async (req: Request<{}, {}, {}, updateArticleQuery>, res: Response, next: NextFunction) => {
  try {
    const { author, user, article_id, category_id, buffer, originalname } = parse(req);
    authorization(user, author);
    const { path } = await getFileInformation(article_id);
    const filename = filenaming(originalname);
    await savingFile(filename, user, buffer);
    let article = null;

    article = await patchArticle(article_id, category_id, originalname, `${user}/${filename}`);
    const oldfilename = path.split('/')[1];
      
    file.del(user, oldfilename).catch((err) => {
      console.log('ERROR LOG(file del)', 'call adminisrator');
    });

    return res.status(200).json({ 
      article: {
        title: article.title,
        category_id: article.category_id,
        id: article_id,
        content: buffer.toString(),
      }
    });
  } catch (err) {
    return next(err);
  }
};

export default updateArticle;
