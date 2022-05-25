import { fetcher } from "./fetcher";

const postArticle = async (token: string, email: string, category_id: string, file: FormData) => {
  const res = await fetcher(`/author/article?user=${email}&category_id=${category_id}`, {
      'Authorization': `Bearer ${token}`
    },{
      method: 'POST',
      body: file
   });

  const result = await res.json();
  return ({ code: res.status, data: result });
};

export default postArticle;
