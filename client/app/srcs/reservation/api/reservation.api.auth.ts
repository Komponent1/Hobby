import { UnAuthorizedException } from '../util/reservation.util.exception';

export const postLogin = async (uid: string, pw: string): Promise<{
  access_token: string;
  uid: string;
  name: string;
}> => {
  const response = await fetch(`/reservation/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid, pw }),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }

  throw new UnAuthorizedException();
};
