import { fetcher } from "./fetcher";

const patchArticle = async (token: string, email: string, article_id: string, file: FormData) => {
  const res = await fetcher(`/author/article?user=${email}&article_id=${article_id}`, {
    'Authorization': `Bearer ${token}`
  }, {
    method: 'PATCH',
    body: file
  });

  const result = await res.json();
  return ({ code: res.status, data: result });
};

export default patchArticle;
