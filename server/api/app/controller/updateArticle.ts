import { Request, Response, NextFunction } from 'express';
import { Readable } from 'stream';
import { authorization, file }from '../lib';
import { Article } from '../model';

type updateArticleQuery = { user: string, article_id: string }
const parse = (req: Request<{}, {}, {}, updateArticleQuery>) => {
  try {
    const author = req.headers['x-user'] as string;
    const { user, article_id } = req.query;
    const { buffer, originalname } = req.file;

    return { author, user, article_id, buffer, originalname };
  } catch (err) {
    console.log('ERROR LOG(parse)', err);
    throw ({
      code: 500,
      msg: 'No correct parameter'
    });
  }
};
type tGetPath = (article_id: string) => Promise<{ title: string, path: string }>;
const getFileInformation: tGetPath = async (article_id) => {
  try {
    const { title, path } = await Article.get({ article_id }) as any;

    return { title, path };
  } catch (err) {
    console.log('ERROR LOG(DB)', err);
    throw ({
      code: 500,
      msg: 'Error in DB'
    });
  }
};
type tSavingFile = (filename: string, user: string, buffer: any) => Promise<void>
const savingFile: tSavingFile = async (filename, user, buffer) => {
  const stream = Readable.from(buffer.toString());
  try {
    await file.send(user, filename, stream);
  } catch (err) {
    throw(err);
  }
};
type tPatchArticle = (article_id: string, callback: Function, originalname?: string) => Promise<any>
const patchArticle: tPatchArticle = async (article_id, callback, originalname) => {
  try {
    return await Article.patch(article_id, originalname);
  } catch (err) {
    console.log('ERROR LOG(DB)', err);
    callback();
    throw({
      code: 500,
      msg: 'Error in DB'
    })
  }
}

const updateArticle = async (req: Request<{}, {}, {}, updateArticleQuery>, res: Response, next: NextFunction) => {
  try {
    const { author, user, article_id, buffer, originalname } = parse(req);
    authorization(author, user);
    const { title, path } = await getFileInformation(article_id);
    await savingFile(originalname, user, buffer);
    let article = null;
    if (title !== originalname) {
      const callback = () => file.del(user, originalname).catch((err) => {
        console.log('ERROR LOG', 'call adminisrator')
      });
      article = await patchArticle(article_id, callback, originalname);
    } else {
      /* TODO: when fail, file rollback? */
      article = await patchArticle(article_id, () => {});
    }

    res.status(200).json({ article });

    if (title !== originalname) {
      const oldfilename = path.split('/')[1];
      file.del(user, oldfilename).catch((err) => {
        console.log('ERROR LOG', 'call adminisrator');
      });
    }
    return 'success'; /* For testing */
  } catch (err) {
    return next(err);
  }
};

export default updateArticle;
