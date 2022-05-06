import { Readable } from 'stream';
import { fileSend } from '../lib/file';
import { Article } from '../model';

const pathupload = async (title, category_id, user_email, path) => {
  await Article.post(title, category_id, user_email, path);
};

const post = async (user: string, category: string, filename: string, buffer): Promise<void> => {
  const stream = Readable.from(buffer.toString());
  await fileSend(user, filename, stream);
  await pathupload(filename, category, user, `${user}/${filename}`);
};

export default post;
