import { fetcher } from "./fetcher";

const deleteArticle = async (token: string, email: string, article_id: string) => {
  const res = await fetcher(`/author/article?user=${email}&article_id=${article_id}`, {
    'Authorization': `Bearer ${token}`
  }, {
    method: 'DELETE'
  });

  return ({ code: res.status });
};

export default deleteArticle;
