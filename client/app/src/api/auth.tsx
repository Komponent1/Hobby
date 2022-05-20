const auth = async (token: string) => {
  const res = await fetch('/auth', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return res.status;
};

export default auth;