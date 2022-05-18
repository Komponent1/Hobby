const getArticle = async (article_id: string) => {
  const res = await fetch(`/api/article?article_id=${article_id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const result = await  res.json();

  return ({ code: res.status, data: result });
};

export default getArticle;
