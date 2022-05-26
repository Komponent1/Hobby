import { Request, Response, NextFunction } from 'express';
import { authorization, makeJwt } from '../lib';

const getRefresh = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.cookies.blog_refresh_token) {
      console.log('ERROR LOG(cookie check)', req.cookies)
      throw ({
        code: 401,
        msg: 'No token in header'
      });
    }
    const payload = authorization(req.cookies.blog_refresh_token);
    const result = makeJwt(payload);

    res.cookie('blog_refresh_token', result.refreshToken, {
      maxAge: 60 * 60 * 24 * 30
    });
    return res.status(200).json({
      email: payload,
      access_token: result.accessToken,
      token_type: 'Bearer',
      expires_in: 1800,
      scope: 'create'
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default getRefresh;
