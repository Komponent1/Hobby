import { fetcher } from "./fetcher";

export type token = {
  access_token: string,
  token_type: string,
  expires_in: number,
  scope: string
}
const login = async (): Promise<token> => {
  const response = await fetcher('/sign/refresh', {}, {});
  const result = await response.json();
  if (response.status !== 200) {
    throw result;
  }

  return result;
};

export default login;
