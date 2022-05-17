export type token = {
  access_token: string,
  token_type: string,
  expires_in: number,
  scope: string
}
const fetcher = async (): Promise<token> => {
  const response = await fetch('/sign/refresh');
  const result = await response.json();
  if (response.status !== 200) {
    throw result;
  }

  return result;
};

export default fetcher;
