import { rest } from 'msw';
import { articles, article } from './data';

const getArticle = rest.get('/api/article', (req, res, ctx) => {
  const article_id = req.url.searchParams.get('article_id');

  if(article_id === 'error') {
    return res(
      ctx.status(500),
      ctx.json({
        msg: ''
      })
    )
  }
  return res(
    ctx.status(200),
    ctx.json({
      article
    })
  )
});
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
      count: articles.length,
      articles: data.slice(idx * num, (idx + 1) * num)
    })
  );
});

const postArticle = rest.post('/author/article', (req, res, ctx) => {
  const user = req.url.searchParams.get('user');

  if (user === 'no token') {
    return res(
      ctx.status(401),
      ctx.json({ msg: '' })
    )
  } else if (user === 'no owner') {
    return res(
      ctx.status(403),
      ctx.json({ msg: '' })
    )
  } else if (user === 'internal') {
    return res(
      ctx.status(500),
      ctx.json({ msg: '' })
    )
  }
  
  return res(
    ctx.status(200),
    ctx.json({
      article
    })
  )
});
const patchArticle = rest.patch('/author/article', (req, res, ctx) => {
  const user = req.url.searchParams.get('user');

  if (user === 'no token') {
    return res(
      ctx.status(401),
      ctx.json({ msg: '' })
    )
  } else if (user === 'no owner') {
    return res(
      ctx.status(403),
      ctx.json({ msg: '' })
    )
  } else if (user === 'internal') {
    return res(
      ctx.status(500),
      ctx.json({ msg: '' })
    )
  }

  return res(
    ctx.status(200),
    ctx.json({
      article
    })
  )
});
const deleteArticle = rest.delete('/author/article', (req, res, ctx) => {
  const user = req.url.searchParams.get('user');

  if (user === 'no token') {
    return res(
      ctx.status(401),
      ctx.json({ msg: '' })
    )
  } else if (user === 'no owner') {
    return res(
      ctx.status(403),
      ctx.json({ msg: '' })
    )
  } else if (user === 'internal') {
    return res(
      ctx.status(500),
      ctx.json({ msg: '' })
    )
  }

  return res(
    ctx.status(204),
  )
});

export { getArticle, getArticles, postArticle, patchArticle, deleteArticle };