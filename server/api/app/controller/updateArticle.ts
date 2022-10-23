import { Request, Response, NextFunction } from 'express';
import { Readable } from 'stream';
import fs from 'fs';
import { ERROR, file }from '../lib';
import db from '../model/connect';
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
type Query = { article_id: string }
const parse = (req: Request<{}, {}, {}, Query>) => {
  try {
    const author = req.headers['x-user'] as string;
    console.log(req.headers)
    const { article_id } = req.query;
    const md = req.files['md'][0];
    const { title, tag } = JSON.parse(req.files['article'][0].buffer.toString() as string);
    const banner = req.files['banner'][0];

    return { author, article_id, md, title, tag, banner };
  } catch (err) {
    ERROR.paramError(err);
  }
};
const dataFromDB = async (article_id: string) => {
  try {
    return await db.one('SELECT user_id, path FROM article WHERE id = $1',
    [parseInt(article_id)]);
  } catch (err) {
    ERROR.dbError(err);
  }
};
const uploadBanner = (banner: any) => {
  fs.writeFile(`public/${banner.originalname}`, banner.buffer, (err) => {});
};
const uploadTag = async (tags: { name: string, color: string }[]) => {
  try {
    const inDB = await db.many(`SELECT * FROM tag WHERE ${tags.map(({ name }) => `name = '${name}'`).join(' OR ')}`);
    const outer = tags.filter(({ name }) => !inDB.map((r) => r.name).includes(name));
    if (outer.length === 0) return inDB;
    const outDB = await db.many(`INSERT INTO tag(name, color) VALUES ${outer.map(({ name, color }) => `('${name}', '${color}')`).join(', ')} RETURNING *`);
    return [...inDB, ...outDB];
  } catch (err) {
    if (err.code === 0) {
      const outDB = await db.many(`INSERT INTO tag (name, color) VALUES ${tags.map(({ name, color }) => `('${name}', '${color}')`).join(', ')} RETURNING *`);
      return outDB;
    }
    ERROR.dbError(err);
  }
}
type tSavingFile = (filename: string, user: string, buffer: any) => Promise<void>
const savingFile: tSavingFile = async (filename, user, buffer) => {
  const stream = Readable.from(buffer.toString());
  await file.send(user, filename, stream);
};
const patchArticle = async (article_id: string, src: string, title: string) => {
  try {
    await db.none(
      'UPDATE article SET src = $1, title = $2, update_date = $3 WHERE id = $4',
      [`http://gateway:80/${src}`, title, new Date().toString(), parseInt(article_id)],
    )
  } catch (err) {
    ERROR.dbError(err);
  }
};
const updateRelation = async (tag, article_id) => {
  try {
    await db.none('DELETE FROM article_tag WHERE article_id = $1', [parseInt(article_id)])
    await db.none(`INSERT INTO article_tag (article_id, tag_id) VALUES ${tag.map(({ id }) => `(${article_id}, ${id})`).join(', ')}`)
  } catch(err) {
    console.log('ERROR LOG(DB)', err)
    ERROR.dbError(err)
  }
};
const updateArticle = async (req: Request<{}, {}, {}, Query>, res: Response, next: NextFunction) => {
  try {
    const { author, md, article_id, tag, banner, title } = parse(req);
    uploadBanner(banner);
    const { user_id, path } = await dataFromDB(article_id);
    if (author !== user_id) ERROR.authError('INVALID PERMIT');
    const tags = await uploadTag(tag);
    const [dir, filename] = path.split('/');
    await savingFile(filename, dir, md.buffer);
    await patchArticle(article_id, `public/${banner.originalname}`, title);
    await updateRelation(tags, article_id);

    return res.status(200).json({ id: article_id });
  } catch (err) {
    return next(err);
  }
};

export default updateArticle;
