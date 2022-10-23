import { Request, Response, NextFunction } from 'express';
import { Readable } from 'stream';
import fs from 'fs';
import { ERROR, file, filenaming, splitpath }from '../lib';
import db from '../model/connect';

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
const parse = (req: Request<{}, {}, {}, {}>) => {
  try {
    const md = req.files['md'][0];
    const { title, tag } = JSON.parse(req.files['article'][0].buffer.toString() as string);
    const banner = req.files['banner'][0];
    const author = req.headers['x-user'] as string;

    return { author, title, tag, banner, md };
  } catch(err) {
    ERROR.paramError(err);
  }
}
const uploadBanner = (banner: any) => {
  fs.writeFile(`public/${banner.originalname}`, banner.buffer, (err) => {});
}
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
const uploadArticle = async (title, user, path, src) => {
  try {
    return await db.one(
      `INSERT INTO article(title, publish_date, update_date, user_id, path, src) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, new Date().toString(), new Date().toString(), user, path, `http://gateway:80/${src}`]
    );
  } catch(err) {
    console.log('ERROR LOG(DB)', err)
    const [ dir, filename ] = splitpath(path);
    file.del(dir, filename).catch(err => {
      console.log('ERROR LOG(FILE)', '관리자 호출을 요망함')
    });
    ERROR.dbError(err)
  };
};
const uploadRelation = async (tag, article) => {
  try {
    await db.none(`INSERT INTO article_tag(article_id, tag_id) VALUES ${tag.map(({ id }) => `(${article.id}, ${id})`).join(', ')}`)
  } catch(err) {
    console.log('ERROR LOG(DB)', err)
    ERROR.dbError(err)
  }
};
const postArticle = async (req: Request<{}, {}, {}, {}>, res: Response, next: NextFunction) => {  
  try {
    const { author, md, tag, banner, title } = parse(req);
    uploadBanner(banner);
    const tags = await uploadTag(tag);
    const filename = filenaming(title);
    await savingFile(filename, author, md.buffer);
    const article = await uploadArticle(title, author, `${author}/${filename}`, `public/${banner.originalname}`) as any;
    await uploadRelation(tags, article);
    
    return res.status(200).json({ id: article.id });
  } catch (err) {
    return next(err);
  }
}


export default postArticle;
