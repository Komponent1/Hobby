import { Readable } from 'stream';
import * as file from '../lib/file';
import { Article } from '../model';

const pathupload = async (title, category_id, user_email, path): Promise<void> => {
  try {
    await Article.post(title, category_id, user_email, path);
  } catch(err) {
    throw ({
      code: 500,
      msg: 'DB upload error'
    });
  };
};

const postArticle = async (user: string, category: string, filename: string, buffer: any): Promise<void> => {
  const stream = Readable.from(buffer.toString());
  try {
    await file.send(user, filename, stream);
  } catch (err) {
    throw(err);
  }
  
  try {
    await pathupload(filename, category, user, `${user}/${filename}`);
  } catch(err) {
    file.del(user, filename);
    throw(err);
  }
  
};

export default postArticle;
