import { rest } from 'msw';
import { token } from './data';

type userReq = {
  email: string, password: string
}
const login = rest.post<userReq>('/sign/login', async (req, res, ctx) => {
  const { email } = req.body;

  if (email === 'nouser') {
    return res(
      ctx.status(412),
      ctx.json({
        msg: 'No User in DB',
      })
    );
  }

  if (email === 'nopassword') {
    return res(
      ctx.status(401),
      ctx.json({
        msg: 'Not Matched Password'
      })
    )
  }
  return res(
    ctx.status(200),
    ctx.cookie('blog_refresh_token', '1234', {
      maxAge: 60 * 60 * 24 * 30
    }),
    ctx.json(token)
  )
});

export default login;