import { Readable } from 'stream';
import * as file from '../lib/file';
import { Article } from '../model';

const pathupload = async (title, category_id, user_email, path) => {
  await Article.post(title, category_id, user_email, path);
};

const post = async (user: string, category: string, filename: string, buffer: any): Promise<void> => {
  const stream = Readable.from(buffer.toString());
  try {
    await file.send(user, filename, stream);
  } catch (err) {
    throw ({
      code: 500,
      msg: 'file sending problem'
    })
  }
  
  try {
    await pathupload(filename, category, user, `${user}/${filename}`);
  } catch(err) {
    file.del(user, filename);
    throw ({
      code: 500,
      msg: 'DB upload errer'
    })
  }
  
};

export default post;
