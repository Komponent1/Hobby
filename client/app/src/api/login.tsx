export type token = {
  access_token: string,
  token_type: string,
  expires_in: number,
  scope: string
}
const fetcher = async (email: string, password: string): Promise<token> => {
  const response = await fetch('/auth/login', {
    headers: { 'Content-Type': 'application/json' },
    method: 'post', body: JSON.stringify({ email, password })
  });
  const result = await response.json();
  if (response.status !== 200) {
    throw result.msg
  }

  return result;
};
export default fetcher;
