import { Product } from '../dto/reservation.dto.product';
import { UnAuthorizedException, UnknownException } from '../util/reservation.util.exception';

export const postProduct = async (
  {
    accessToken, name, price, spendMinute,
  }
  : { accessToken: string; name: string; price: number; spendMinute: number },
): Promise<Product> => {
  const response = await fetch(`/reservation/admin/product`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ name, price, spendMinute }),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }

  if (response.status === 401) {
    throw new UnAuthorizedException();
  }
  throw new UnknownException();
};
export const getProducts = async ({
  accessToken,
}: {
  accessToken: string;
}): Promise<Product[]> => {
  const response = await fetch(`/reservation/admin/products`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }

  if (response.status === 401) {
    throw new UnAuthorizedException();
  }
  throw new UnknownException();
};
export const deleteProduct = async (
  {id, accessToken}: {id: string; accessToken: string},
): Promise<void> => {
  const response = await fetch(`/reservation/admin/product/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    if (response.status === 401) {
      throw new UnAuthorizedException();
    }
    throw new UnknownException();
  }
};
export const patchProduct = async ({
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
  const response = await fetch(`/reservation/admin/product/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ name, price }),
  });
  if (!response.ok) {
    throw new UnknownException();
  }
};
export const getProductById = async (
  {accessToken, id}: {accessToken: string; id: string},
): Promise<Product> => {
  const response = await fetch(`/reservation/admin/product/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  if (response.status === 401) {
    throw new UnAuthorizedException();
  }
  throw new UnknownException();
};
export const getProductByName = async (
  {accessToken, name}: {accessToken: string; name: string},
): Promise<Product[]> => {
  const response = await fetch(`/reservation/admin/product?name=${encodeURIComponent(name)}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }

  if (response.status === 401) {
    throw new UnAuthorizedException();
  }
  throw new UnknownException();
};
