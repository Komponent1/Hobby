const postCategory = async (token: string, user: string, category_name: string) => {
  const res = await fetch('author/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ user, category_name })
  });

  const result = res.json();

  return ({ code: res.status, data: result });
};

export default postCategory;
