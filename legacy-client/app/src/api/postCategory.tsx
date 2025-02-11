import { ApiFunc } from "Api";
import { Category } from "Data";
import { fetcher } from "./fetcher";
/*
  AUTHORIZATION token
  BODY: user, category_name
  RES:
    200, { category }
  ERORR:
    400, paramter
    401, authentication (in auth)
    403, authorization
    412, category name already in db
    500, DB
*/
const postCategory: ApiFunc<{ token: string, email: string, category_name: string }, Category> =
async ({ token, email, category_name }) =>
{
  const res = await fetcher('/author/category', {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }, {
      method: 'POST',
      body: JSON.stringify({ user: email, category_name })
  });
  if (
    res.status === 400 ||
    res.status === 401 ||
    res.status === 403 ||
    res.status === 412 ||
    res.status === 500
  ) return ({ code: res.status });

  const result = await res.json();
  return ({ code: res.status, data: result });
};

export default postCategory;
