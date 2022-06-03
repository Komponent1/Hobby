import { fetcher } from "./fetcher";
/*
  AUTHORIZATION token
  QUERY: user, article_id
  RES:
    204, success
  ERROR:
    400, paramter
    401, authentication (in auth)
    403, authorization
    500, DB or File
*/
const deleteArticle = async (token: string, email: string, article_id: string) => {
  const res = await fetcher(`/author/article?user=${email}&article_id=${article_id}`, {
    'Authorization': `Bearer ${token}`
  }, {
    method: 'DELETE'
  });

  return ({ code: res.status });
};

export default deleteArticle;
