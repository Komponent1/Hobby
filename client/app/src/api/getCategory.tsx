const getCategory = async (email: string) => {
  const res = await fetch(`/api/category?user=${email}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const result = await res.json();

  return ({ code: res.status, data: result });
};

export default getCategory;
