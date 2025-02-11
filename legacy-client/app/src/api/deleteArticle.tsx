import { ApiFunc } from "Api";
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

const deleteArticle: ApiFunc<{ token: string, email: string, article_id: string }, {article_id: string}> =
async ({ token, email, article_id }) =>
{
  const res = await fetcher(`/author/article?user=${email}&article_id=${article_id}`, {
    'Authorization': `Bearer ${token}`
  }, {
    method: 'DELETE'
  });

  return ({ code: res.status, data: article_id });
};

export default deleteArticle;
