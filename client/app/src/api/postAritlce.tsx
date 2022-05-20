const postArticle = async (token: string, email: string, category_id: string, file: FormData) => {
  const res = await fetch(`/author/article?user=${email}&category_id=${category_id}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: file
  });

  const result = res.json();
  return ({ code: res.status, data: result });
};

export default postArticle;
