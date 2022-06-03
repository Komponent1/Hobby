import { fetcher } from "./fetcher";
/*
  QUERY: user
  RES:
    200, { categories }
  ERROR:
    400: param error
    401, authentication(in auth)
    403, authorization
    500, db error
*/
const getCategory = async (email: string) => {
  const res = await fetcher(`/api/category?user=${email}`, {
    'Content-Type': 'application/json'
  }, {});
  if (
    res.status === 400 ||
    res.status === 500
  ) return ({ code: res.status });

  const result = await res.json();
  return ({ code: res.status, data: result });
};

export default getCategory;
