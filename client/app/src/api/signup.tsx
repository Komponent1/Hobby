const fetcher = async (email: string, password: string) => {
  const res = await fetch('/sign/users', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email, password
    })
  });
  if (res.status === 204) return ({ result: true, msg: 'SUCCESS' });
  else {
    const error = await res.json();
    return ({ result: false, msg: error.msg })
  }
}

export default fetcher;
