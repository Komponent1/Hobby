export type token = {
  access_token: string,
  token_type: string,
  expires_in: number,
  scope: string
}
const login = async (email: string, password: string): Promise<token> => {
  const response = await fetch('/sign/login', {
    headers: { 'Content-Type': 'application/json' },
    method: 'post', body: JSON.stringify({ email, password })
  });
  const result = await response.json();
  if (response.status !== 200) {
    throw response.status
  }

  return result;
};
export default login;
