import { ApiFunc } from "Api";
import { Articles } from "Data";
import { fetcher } from "./fetcher";
/*
  QUERY: user, category_id?, pagination, num
  RES:
    200, { count, articles }
  ERROR:
    400, paramter
    500, db error
*/
const getArticles: ApiFunc<Articles> = async (email: string, idx: number, num: number, category_id?: string) => {
  let url = `/api/articles?user=${email}`
    + (category_id ? `&category_id=${category_id}` : '')
    + `&pagination=${idx}&num=${num}`;
  const res = await fetcher(url, {
      'Content-Type': 'application/json'
  }, {});
  if (
    res.status === 400 ||
    res.status === 500
  ) return ({ code: res.status });

  const result = await res.json();

  return ({ code: res.status, data: result });
};

export default getArticles;
