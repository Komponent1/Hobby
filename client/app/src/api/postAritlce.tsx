import { fetcher } from "./fetcher";
/*
  AUTHORIZATION token
  QUERY: user, category_id
  BODY: file(x-form-data)
  RES:
    200, { artilc: { title, id, category_id, content } }
  ERORR:
    400, paramter
    401, authentication (in auth)
    403, authorization
    500, DB or File
*/
const postArticle = async (token: string, email: string, category_id: number, file: FormData) => {
  const res = await fetcher(`/author/article?user=${email}&category_id=${category_id}`, {
      'Authorization': `Bearer ${token}`
    },{
      method: 'POST',
      body: file
    });
  if (
    res.status === 400 ||
    res.status === 401 ||
    res.status === 403 ||
    res.status === 500
  ) return ({ code: res.status });

  const result = await res.json();
  return ({ code: res.status, data: result });
};

export default postArticle;
