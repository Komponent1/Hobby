import { rest } from 'msw';
import { users } from './data';
// import { makeJwt } from './utils';

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
  const { email, password } = req.body;

  if(users.findIndex(e => e.email === email) !== -1) {
    return res(
      ctx.status(500),
      ctx.json({
        msg: 'Already in User'
      })
    );
  }

  users.push({
    ID: users.length + 1,
    email, password, salt: `salt${users.length + 1}`
  });

  return res(
    ctx.status(204)
  );
});

const login = rest.post<userReq>('/auth/login', (req, res, ctx) => {
  console.log('login')
  const { email, password } = req.body;
  // const result = makeJwt(email);

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
