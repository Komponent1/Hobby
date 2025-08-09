import { Staff } from '../dto/reservation.dto.staff';

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
    console.error('Error creating staff:', error);
    throw error;
  }
};
export const getStaffs = async (): Promise<Staff[]> => {
  try {
    const response = await fetch(`/reservation/admin/staffs`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching staff:', error);
    throw error;
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
    console.error('Error deleting staff:', error);
    throw error;
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
    console.error('Error updating staff:', error);
    throw error;
  }
};
