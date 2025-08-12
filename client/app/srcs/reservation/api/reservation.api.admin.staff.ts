import { Staff } from '../dto/reservation.dto.staff';
import { ErrorType } from '../store/reservation.store.error';

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
    throw new Error(ErrorType.Unknown);
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
    throw new Error(ErrorType.Unknown);
  }
};
export const deleteStaff = async (
  {accessToken, id}: {accessToken: string, id: string},
): Promise<void> => {
  try {
    const response = await fetch(`/reservation/admin/staff/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete staff');
    }
  } catch (error) {
    throw new Error(ErrorType.Unknown);
  }
};
export const patchStaff = async (
  {accessToken, id, name}: {accessToken: string, id: string, name: string},
): Promise<void> => {
  try {
    const response = await fetch(`/reservation/admin/staff/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error('Failed to update staff');
    }
  } catch (error) {
    throw new Error(ErrorType.Unknown);
  }
};
