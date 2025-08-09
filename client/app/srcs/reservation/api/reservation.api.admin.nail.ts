import { Nail } from '../dto/reservation.dto.nail';

export const postNail = async ({ name, price }: { name: string; price: number }): Promise<Nail> => {
  try {
    const response = await fetch(`/reservation/admin/nail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, price }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating nail:', error);
    throw error;
  }
};
export const getNails = async (): Promise<Nail[]> => {
  try {
    const response = await fetch(`/reservation/admin/nails`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching nails:', error);
    throw error;
  }
};
export const deleteNail = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`/reservation/admin/nail/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete nail');
    }
  } catch (error) {
    console.error('Error deleting nail:', error);
    throw error;
  }
};
export const patchNail = async (id: string, name: string, price: number): Promise<void> => {
  try {
    const response = await fetch(`/reservation/admin/nail/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, price }),
    });
    if (!response.ok) {
      throw new Error('Failed to update nail');
    }
  } catch (error) {
    console.error('Error updating nail:', error);
    throw error;
  }
};
export const getNailById = async (id: string): Promise<Nail> => {
  try {
    const response = await fetch(`/reservation/admin/nail/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch nail');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching nail by ID:', error);
    throw error;
  }
};
export const getNailByName = async (name: string): Promise<Nail[]> => {
  try {
    const response = await fetch(`/reservation/admin/nail?name=${encodeURIComponent(name)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch nails by name');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching nails by name:', error);
    throw error;
  }
};
