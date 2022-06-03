import { fetcher } from "./fetcher";
/*
  BODY: email, password
  RES:
    204, success
  ERROR:
    400, paramter
    412, ref (already email)
    500, logic or db
*/
const postUser = async (email: string, password: string) => {
  const res = await fetcher('/sign/users', {
      'Content-Type': 'application/json'
    }, {
      method: 'post',
      body: JSON.stringify({ email, password })
  });

  return res.status;
}

export default postUser;
