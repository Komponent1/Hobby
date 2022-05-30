import { fetcher } from './fetcher';

const getArticle = async (article_id: string) => {
  const res = await fetcher(`/api/article?article_id=${article_id}`, {
    'Content-Type': 'application/json'
  }, {});

  const result = await  res.json();

  return ({ code: res.status, data: result });
};

export default getArticle;
