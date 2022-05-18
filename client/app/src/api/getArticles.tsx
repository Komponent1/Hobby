const getArticles = async (email: string, idx: number, num: number, category_id?: string) => {
  let url = `/api/articles?user=${email}`
    + (category_id ? `&category_id=${category_id}` : '')
    + `&pagination=${idx}&num=${num}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const result = await res.json();

  return ({ code: res.status, data: result });
};

export default getArticles;
