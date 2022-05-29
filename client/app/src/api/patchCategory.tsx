import { fetcher } from "./fetcher";

const patchCategory = async (token: string, email: string, category_id: string, category_name: string) => {
  const res = await fetcher(`/author/category`, {
    'Authorization': `Bearer ${token}`
  }, {
    method: 'PATCH',
    body: JSON.stringify({
      user: email, category_id, category_name
    })
  });

  const result = await res.json();
  return ({ code: res.status, data: result });
};

export default patchCategory;