import { Request, Response, NextFunction } from 'express';
import { Readable } from 'stream';
import * as file from '../lib/file';
import { Article } from '../model';

type tPathupload = (filename: string, user: string, category_id: string) => Promise<void>
const pathupload: tPathupload = async (filename, user, category_id) => {
  try {
    await Article.post(filename, category_id, user, `${user}/${filename}`);
  } catch(err) {
    file.del(user, filename);
    throw ({
      code: 500,
      msg: 'DB upload error'
    });
  };
};

type tSavingFile = (filename: string, user: string, category_id: string, buffer: any) => Promise<void>
const savingFile: tSavingFile = async (filename, user, category_id, buffer) => {
  const stream = Readable.from(buffer.toString());
  try {
    await file.send(user, filename, stream);
  } catch (err) {
    throw(err);
  }
};

type postArticleQuery = { user: string, category_id: string }
const postArticle = async (req: Request<{}, {}, {}, postArticleQuery>, res: Response, next: NextFunction) => {
  try {
    const { user, category_id } = req.query;
    const { buffer, originalname } = req.files[0];
    
    await savingFile(originalname, user, category_id, buffer);
    await pathupload(originalname, user, category_id);

    return res.status(204).end();
  } catch (err) {
    next(err);
  }
}


export default postArticle;
