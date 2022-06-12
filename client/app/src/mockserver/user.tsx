import { rest } from 'msw';
import { users, token } from './data';

const getUsers = rest.get('/api/users', (req, res, ctx) => {
  const user = req.url.searchParams.get('user');
  if (!user || user === '') {
    return res(
      ctx.status(200),
      ctx.json({
        user: users
      })
    );
  }

  if (user === 'error') return res(
    ctx.status(500),
    ctx.json({
      msg: 'No user in db'
    })
  );

  return res(
    ctx.status(200),
    ctx.json({
      user: user
    })
  );
});
type userReq = {
  email: string, password: string
}
const postUser = rest.post<userReq>('/sign/users', (req, res, ctx) => {  
  const { email } = req.body;

  if(email === '401') {
    return res(
      ctx.status(401),
      ctx.json({
        msg: 'Already in User'
      })
    );
  }

  if (email === '500') {
    return res(
      ctx.status(500),
      ctx.json({
        msg: 'Internal Server Error'
      })
    );
  }

  return res(
    ctx.status(204)
  );
});

const refresh = rest.get('/sign/refresh', async (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json(token)
  )
});

export { getUsers, postUser, refresh }