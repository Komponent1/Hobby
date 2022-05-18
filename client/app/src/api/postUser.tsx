const resultMsg = {
  204: 'SUCCESS',
  401: 'Already User',
  500: 'Internal Server Error',
};
const postUser = async (email: string, password: string) => {
  const res = await fetch('/sign/users', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email, password
    })
  });

  return ({ code: res.status, data: resultMsg[res.status as (204|500|401)] });
}

export default postUser;
