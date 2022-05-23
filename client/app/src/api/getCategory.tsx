import { fetcher } from "./fetcher";

const getCategory = async (email: string) => {
  const res = await fetcher(`/api/category?user=${email}`, {
    'Content-Type': 'application/json'
  }, {});

  const result = await res.json();

  return ({ code: res.status, data: result });
};

export default getCategory;
