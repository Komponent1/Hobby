import { fetcher } from "./fetcher";

const postCategory = async (token: string, user: string, category_name: string) => {
  const res = await fetcher('/author/category', {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }, {
      method: 'POST',
      body: JSON.stringify({ user, category_name })
  });

  const result = await res.json();
  console.log(res, result)
;
  return ({ code: res.status, data: result });
};

export default postCategory;
