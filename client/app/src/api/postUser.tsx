import { fetcher } from "./fetcher";

const resultMsg = {
  204: 'SUCCESS',
  401: 'Already User',
  500: 'Internal Server Error',
};
const postUser = async (email: string, password: string) => {
  const res = await fetcher('/sign/users', {
      'Content-Type': 'application/json'
    }, {
      method: 'post',
      body: JSON.stringify({ email, password })
  });

  return ({ code: res.status, data: resultMsg[res.status as (204|500|401)] });
}

export default postUser;
