import { ApiFunc } from "Api";
import { Article } from "Data";
import { fetcher } from "./fetcher";
/*
  AUTHORIZATION token
  QUERY: user, article_id, category_id
  BODY: file(x-form-data)
  RES:
    200, { artilc: { title, id, category_id, content } }
  ERORR:
    400, paramter
    401, authentication (in auth)
    403, authorization
    500, DB or File
  ETC:
    파일 삭제에 실패한 경우 관리자를 호출, 직접 삭제요망
*/
const patchArticle: ApiFunc<{ token: string, email: string, article_id: string, category_id: number, file: FormData }, Article> = async ({ token, email, article_id, category_id, file}) => {
  const res = await fetcher(`/author/article?user=${email}&article_id=${article_id}&category_id=${category_id}`, {
    'Authorization': `Bearer ${token}`
  }, {
    method: 'PATCH',
    body: file
  });
  if (
    res.status === 400 ||
    res.status === 401 ||
    res.status === 403 ||
    res.status === 500
  ) {
    return ({ code: res.status });
  }

  const result = await res.json();
  return ({ code: res.status, data: result });
};

export default patchArticle;
