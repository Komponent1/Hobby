import { Article } from "../model";
import { Writable } from 'stream';
import * as file from '../lib/file';

const getArticle = async (title: string, category_id: string, user_email: string): Promise<any> => {
  try {
    const { path } = await Article.get(title, category_id, user_email);
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
  } catch (err) {
    throw ({
      code: 500,
      msg: 'DB getting Error'
    })
  }
};

export default getArticle