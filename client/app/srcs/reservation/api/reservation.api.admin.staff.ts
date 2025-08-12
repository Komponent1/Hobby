import { HttpException } from '../dto/reservation.dto.exception';
import { Staff } from '../dto/reservation.dto.staff';
import { UnAuthorizedException, UnknownException } from '../util/reservation.util.exception';

export const postStaff = async (
  {accessToken, name}: {accessToken: string, name: string},
): Promise<Staff> => {
  try {
    const response = await fetch(`/reservation/admin/staff`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name }),
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
export const getStaffs = async ({accessToken}: {accessToken: string}): Promise<Staff[]> => {
  try {
    const response = await fetch(`/reservation/admin/staffs`, {
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
export const deleteStaff = async (
  {accessToken, id}: {accessToken: string, id: string},
): Promise<void> => {
  try {
    await fetch(`/reservation/admin/staff/${id}`, {
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
export const patchStaff = async (
  {accessToken, id, name}: {accessToken: string, id: string, name: string},
): Promise<void> => {
  try {
    await fetch(`/reservation/admin/staff/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name }),
    });
  } catch (error) {
    if ((error as HttpException).statusCode === 401) {
      throw new UnAuthorizedException();
    }
    throw new UnknownException();
  }
};
