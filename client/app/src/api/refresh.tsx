import { ApiFunc } from "Api";
import { fetcher } from "./fetcher";
/*
  header have refresh_token
  RES:
    200, { OAuth 표준 }
  ERROR:
    400, no refresh_token
    403, authentication
    500, logic
*/
const refresh: ApiFunc<null> = async () => {
  const res = await fetcher('/sign/refresh', {}, {});
  if (
    res.status === 400 ||
    res.status === 403 ||
    res.status === 500
  ) return ({ code: res.status });
  
    const result = await res.json();
    return ({ code: res.status, data: result });
};

export default refresh;
