const postCategory = async (token: string, email: string, category_name: string) => {
  const res = await fetch('', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ email, category_name })
  });

  const result = res.json();

  return ({ code: res.status, data: result });
};

export default postCategory;
