import { Request, Response, NextFunction } from 'express';
import { authorization, ERROR, makeJwt } from '../lib';
/*
  header have refresh_token
  RES:
    200, { OAuth 표준 }
  ERROR:
    400, no refresh_token
    403, authentication
    500, logic
*/
const getRefresh = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.cookies.blog_refresh_token) {
      ERROR.paramError('No refresh token');
    }
    const payload = authorization(req.cookies.blog_refresh_token);
    const jwt = makeJwt(payload);

    res.cookie('blog_refresh_token', jwt.refreshToken, {
      maxAge: 60 * 60 * 24 * 30
    });
    return res.status(200).json({
      email: payload,
      access_token: jwt.accessToken,
      token_type: 'Bearer',
      expires_in: 1800,
      scope: 'create'
    });
  } catch (err) {
    next(err);
  }
};

export default getRefresh;
