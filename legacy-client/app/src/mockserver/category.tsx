import { rest } from 'msw';
import { category, newCatetgory } from './data';

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
});
type postBody = { user: string, category_name: string }
const postCategory = rest.post<postBody>('/author/category', (req, res, ctx) => {
  const { user } = req.body;

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
  } else if (user === 'already category_name') {
    return res(
      ctx.status(412),
      ctx.json({ msg: '' })
    )
  } else if (user === 'internal') {
    return res(
      ctx.status(500),
      ctx.json({ msg: '' })
    )
  };

  return res(
    ctx.status(200),
    ctx.json({
      category: newCatetgory
    })
  );
});
type tBody = { user: string, category_id: string, category_name: string }
const patchCategory = rest.patch<tBody>('/author/category', (req, res, ctx) => {
  const { user, category_name } = req.body;

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
  } else if (user === 'already category_name') {
    return res(
      ctx.status(412),
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
      category: {
        id: 1,
        name: category_name,
        user_email: 'seo2im6492@gmail.com',
      }
    })
  )
});
const deleteCategory = rest.delete('/author/category', (req, res, ctx) => {
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
  } else if (user === 'cat have article') {
    return res(
      ctx.status(412),
      ctx.json({ msg: '' })
    )
  } else if (user === 'internal') {
    return res(
      ctx.status(500),
      ctx.json({ msg: '' })
    )
  }

  return res(
    ctx.status(204)
  )
});

export { getCategory, postCategory, patchCategory, deleteCategory };
