import { Staff } from '../dto/reservation.dto.staff';
import { ErrorType } from '../store/reservation.store.error';

export const postStaff = async ({name}: {name: string}): Promise<Staff> => {
  try {
    const response = await fetch(`/reservation/admin/staff`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(ErrorType.Unknown);
  }
};
export const getStaffs = async (): Promise<Staff[]> => {
  try {
    const response = await fetch(`/reservation/admin/staffs`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(ErrorType.Unknown);
  }
};
export const deleteStaff = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`/reservation/admin/staff/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete staff');
    }
  } catch (error) {
    throw new Error(ErrorType.Unknown);
  }
};
export const patchStaff = async (id: string, name: string): Promise<void> => {
  try {
    const response = await fetch(`/reservation/admin/staff/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
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
