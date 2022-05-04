import { rest } from 'msw';
import { users } from './data';

export function handlers() {
  return [
    getUsers,
    addUser,
    login
  ];
}

const getUsers = rest.get('/api/users', (req, res, ctx) => {
  const email = req.url.searchParams.get('email');
  if (!email || email === '') {
    return res(
      ctx.status(200),
      ctx.json({
        user: users
      })
    );
  }
  
  
  const user = users.find(e => e.email === email);
  if (!user) return res(
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
const addUser = rest.post<userReq>('/auth/users', (req, res, ctx) => {  
  const { email } = req.body;

  if(email === 'error') {
    return res(
      ctx.status(500),
      ctx.json({
        msg: 'Already in User'
      })
    );
  }

  return res(
    ctx.status(204)
  );
});

const login = rest.post<userReq>('/auth/login', async (req, res, ctx) => {
  const { email } = req.body;

  if (email === 'nouser') {
    return res(
      ctx.status(401),
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
    ctx.json({
      accessToken: '124',
      token_type: 'Bearer',
      expires_in: 1800,
      scope: 'create'
    })
  )
})
