import { HttpException } from '../dto/reservation.dto.exception';
import { Nail } from '../dto/reservation.dto.nail';
import { UnAuthorizedException, UnknownException } from '../util/reservation.util.exception';

export const postNail = async (
  {
    accessToken, name, price, spendMinute,
  }
  : { accessToken: string; name: string; price: number; spendMinute: number },
): Promise<Nail> => {
  try {
    const response = await fetch(`/reservation/admin/nail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name, price, spendMinute }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    if ((error as HttpException).statusCode === 401) {
      throw new UnAuthorizedException();
    }
    throw new UnknownException();
  }
};
export const getNails = async ({
  accessToken,
}: {
  accessToken: string;
}): Promise<Nail[]> => {
  try {
    const response = await fetch(`/reservation/admin/nails`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    if ((error as HttpException).statusCode === 401) {
      throw new UnAuthorizedException();
    }
    throw new UnknownException();
  }
};
export const deleteNail = async (
  {id, accessToken}: {id: string; accessToken: string},
): Promise<void> => {
  try {
    await fetch(`/reservation/admin/nail/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    if ((error as HttpException).statusCode === 401) {
      throw new UnAuthorizedException();
    }
    throw new UnknownException();
  }
};
export const patchNail = async ({
  id,
  name,
  price,
  accessToken,
}: {
  id: string;
  name: string;
  price: number;
  accessToken: string;
}): Promise<void> => {
  try {
    await fetch(`/reservation/admin/nail/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name, price }),
    });
  } catch (error) {
    throw new UnknownException();
  }
};
export const getNailById = async (
  {accessToken, id}: {accessToken: string; id: string},
): Promise<Nail> => {
  try {
    const response = await fetch(`/reservation/admin/nail/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    if (error as HttpException) {
      throw new UnAuthorizedException();
    }
    throw new UnknownException();
  }
};
export const getNailByName = async (
  {accessToken, name}: {accessToken: string; name: string},
): Promise<Nail[]> => {
  try {
    const response = await fetch(`/reservation/admin/nail?name=${encodeURIComponent(name)}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch nails by name');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if ((error as HttpException).statusCode === 401) {
      throw new UnAuthorizedException();
    }
    throw new UnknownException();
  }
};
