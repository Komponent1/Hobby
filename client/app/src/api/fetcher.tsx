import { BASEURL } from "../env"

export const fetcher = async (path: string, headers: any, options: any) => {
  return await fetch(`${BASEURL}${path}`, {
    headers: {
      'Access-Control-Allow-Headers': 'Authorization',
      ...headers
    },
    ...options
  });
};
