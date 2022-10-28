import { Request, Response, NextFunction } from 'express';
import { ERROR, makeJwt } from '../lib';
import db from '../model/connect';

const parse = (req: Request): { login: string, src: string, github: string } => {
  try {
    console.log(req.body);
    const { login, avatar_url, html_url } = req.body;

    return { login, src: avatar_url, github: html_url }
  } catch(err) {
    ERROR.paramError(err);
  }
}
const getUserFromDB = async (login: string) => {
  try {
    return await db.one('SELECT * FROM users WHERE id = $1', [login]);
  } catch (err) {
    if (err.code === 0) return undefined;
    else ERROR.dbError(err);
  }
}
const updateDB = async (login: string, src: string, github: string) => {
  try {
    await db.none(
      'INSERT INTO users (id, src, github) VALUES ($1, $2, $3)',
      [login, src, github]
    )
  } catch (err) {
    ERROR.dbError(err);
  }
}
export const postGit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { login, src, github } = parse(req);
    const user = await getUserFromDB(login);
    if (!user) await updateDB(login, src, github);

    const jwt = makeJwt(login);
    res.cookie('seolim_blog_access_token', jwt.accessToken, {
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    res.cookie('seolim_blog_user', login, {
      maxAge: 60 * 60 * 24 * 30
    });
    res.cookie('seolim_blog_user_src', src, {
      maxAge: 60 * 60 * 24 * 30
    });
    res.cookie('seolim_blog_user_github', src, {
      maxAge: 60 * 60 * 24 * 30
    })
    
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
};
