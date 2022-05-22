import { Request, Response, NextFunction } from 'express';
import { Readable } from 'stream';
import * as file from '../lib/file';
import { Article } from '../model';

type tPathupload = (filename: string, user: string, category_id: string) => Promise<void>
const pathupload: tPathupload = async (filename, user, category_id) => {
  try {
    return await Article.post(filename, category_id, user, `${user}/${filename}`);
  } catch(err) {
    console.log('db', err);
    file.del(user, filename);
    throw ({
      code: 500,
      msg: 'DB upload error'
    });
  };
};

type tSavingFile = (filename: string, user: string, buffer: any) => Promise<void>
const savingFile: tSavingFile = async (filename, user, buffer) => {
  const stream = Readable.from(buffer.toString());
  try {
    await file.send(user, filename, stream);
  } catch (err) {
    console.log('file', err);
    throw(err);
  }
};

type postArticleQuery = { user: string, category_id: string }
const postArticle = async (req: Request<{}, {}, {}, postArticleQuery>, res: Response, next: NextFunction) => {
  try {
    const { user, category_id } = req.query;
    const author = req.headers['x-user'];

    if (user !== author) return next({
      code: 401,
      msg: 'No match client with blog owner'
    });
    console.log(req.file)
    const { buffer, originalname } = req.file;
    
    await savingFile(originalname, user, buffer);
    const article = await pathupload(originalname, user, category_id);
    console.log(article)

    return res.status(200).json({ article });
  } catch (err) {
    return next(err);
  }
}


export default postArticle;
