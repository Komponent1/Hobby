import { Nail } from '../dto/reservation.dto.nail';
import { ErrorType } from '../store/reservation.store.error';

export const postNail = async (
  { name, price, spendMinute }
  : { name: string; price: number; spendMinute: number },
): Promise<Nail> => {
  try {
    const response = await fetch(`/reservation/admin/nail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, price, spendMinute }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(ErrorType.Unknown);
  }
};
export const getNails = async (): Promise<Nail[]> => {
  try {
    const response = await fetch(`/reservation/admin/nails`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(ErrorType.Unknown);
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
    throw new Error(ErrorType.Unknown);
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
    throw new Error(ErrorType.Unknown);
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
    throw new Error(ErrorType.Unknown);
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
    throw new Error(ErrorType.Unknown);
  }
};
