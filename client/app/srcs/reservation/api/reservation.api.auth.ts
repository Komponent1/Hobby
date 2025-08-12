import {ErrorType} from '../store/reservation.store.error';

export const postLogin = async (uid: string, pw: string): Promise<{
  access_token: string;
  uid: string;
  name: string;
}> => {
  try {
    const response = await fetch(`/reservation/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, pw }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(ErrorType.Unknown);
  }
};
