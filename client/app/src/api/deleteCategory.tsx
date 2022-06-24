import { fetcher } from "./fetcher";
import { ApiFunc } from "Api";
/*
  AUTHORIZATION token
  QUERY: user, category_id
  RES:
    204, success
  ERROR:
    400, parameter
    401, authentication (in auth)
    403, authorization
    412, category have articles
    500, DB
*/
const deleteCategory: ApiFunc<{ token: string, email: string, category_id: string }, string> =
async ({ token, email, category_id }) => {
  const res = await fetcher(`/author/category?user=${email}&category_id=${category_id}`, {
    'Authorization': `Bearer ${token}`
  }, {
    method: 'DELETE'
  });

  return ({ code: res.status, data: category_id });
};

export default deleteCategory;