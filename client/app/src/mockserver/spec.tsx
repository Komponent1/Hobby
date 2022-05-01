import { rest } from 'msw';
import { users } from './data';

export function handlers() {
  return [
    getUsers,
    addUser
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

type addUserReq = {
  email: string, password: string
}
const addUser = rest.post<addUserReq>('/auth/users', (req, res, ctx) => {
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
  )
});
