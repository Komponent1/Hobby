import { fetcher } from "./fetcher";

const deleteCategory = async (token: string, email: string, category_id: string) => {
  const res = await fetcher(`/author/category?user=${email}&category_id=${category_id}`, {
    'Authorization': `Bearer ${token}`
  }, {
    method: 'DELETE'
  });

  return ({ code: res.status });
};

export default deleteCategory;