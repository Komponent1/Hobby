import { ApiFunc } from "Api";
import { Token } from "prismjs";
import { fetcher } from "./fetcher";
/*
  BODY: email, password
  RES:
    200, { OAuth 표준 }
  ERROR:
    400, parameter
    403, authentication
    412, ref error(no email)
    500, logic or db
*/
const login: ApiFunc<Token> = async (email: string, password: string) => {
  const res = await fetcher('/sign/login', {
    'Content-Type': 'application/json'
  }, {
    method: 'post', body: JSON.stringify({ email, password })
  });
  if (
    res.status === 400 ||
    res.status === 403 ||
    res.status === 500
  ) return ({ code: res.status });
  const result = await res.json();
  
  return ({ code: res.status, data: result });
};
export default login;
