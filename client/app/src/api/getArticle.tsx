import { fetcher } from './fetcher';
import { Article } from 'Data';
import { ApiFunc } from 'Api';
/*
  QUERY: article_id
  RES:
    200, { artilc: { title, id, category_id, content } }
  ERORR:
    400, paramter
    500, DB or File
*/
const getArticle: ApiFunc<{ article_id: string }, Article> = async ({ article_id }) => {
  const res = await fetcher(`/api/article?article_id=${article_id}`, {
    'Content-Type': 'application/json'
  }, {});

  if (
    res.status === 400 ||
    res.status === 500
  ) return ({ code:  res.status });
  const result = await  res.json();

  return ({ code: res.status, data: result });
};

export default getArticle;
