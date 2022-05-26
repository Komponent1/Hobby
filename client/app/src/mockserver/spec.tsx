import { rest } from 'msw';
import { users, category, articles, article, newCatetgory } from './data';

export function handlers() {
  return [
    getUsers,
    getCategory,
    getArticles,
    addUser,
    login,
    refresh,
    postArticle,
    getArticle,
    getArticles,
    postCategory
  ];
}

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
const addUser = rest.post<userReq>('/sign/users', (req, res, ctx) => {  
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
const login = rest.post<userReq>('/sign/login', async (req, res, ctx) => {
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
      email: 'seo2im6492@gmail.com',
      accessToken: '124',
      token_type: 'Bearer',
      expires_in: 1800,
      scope: 'create'
    })
  )
});
const refresh = rest.get('/sign/refresh', async (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      email: 'seo2im6492@gmail.com',
      accessToken: '124',
      token_type: 'Bearer',
      expires_in: 1800,
      scope: 'create'
    })
  )
});
const postArticle = rest.post('/author/article', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      article_id: 0
    })
  )
});
const getCategory = rest.get('/api/category', (req, res, ctx) => {
  const user = req.url.searchParams.get('user');

  if (user === 'error') {
    return res(
      ctx.status(500),
      ctx.json({
        msg: 'Error in DB'
      })
    )
  }

  return res(
    ctx.status(200),
    ctx.json({
      categories: category
    })
  )
})
const getArticles = rest.get('/api/articles', (req, res, ctx) => {
  const user = req.url.searchParams.get('user');

  if (user === 'error') {
    return res(
      ctx.status(500),
      ctx.json({
        msg: 'error'
      })
    )
  }
  const category_id = req.url.searchParams.get('category_id');
  const idx = parseInt(req.url.searchParams.get('pagination')  as string);
  const num = parseInt(req.url.searchParams.get('num') as string);

  const data = category_id ? articles.filter(e => e.category_id === parseInt(category_id))
    : articles;

  return res(
    ctx.status(200),
    ctx.json({
      articles: data.slice(idx * num, (idx + 1) * num)
    })
  );
});
const getArticle = rest.get('/api/article', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      article
    })
  )
});
const postCategory = rest.post('/author/category', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      category: newCatetgory
    })
  );
});