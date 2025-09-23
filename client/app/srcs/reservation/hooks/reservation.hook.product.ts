import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useProductStore } from '../store/reservation.store.product';
import * as adminProductApi from '../api/reservation.api.admin.product';
import { ErrorType, useErrorStore } from '../store/reservation.store.error';
import { useAuthStore } from '../store/reservation.store.auth';
import { UnAuthorizedException } from '../util/reservation.util.exception';

export const useProduct = () => {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const products = useProductStore((state) => state.products);
  const initProducts = useProductStore((state) => state.initProducts);
  const addProduct = useProductStore((state) => state.addProduct);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);
  const setErrorType = useErrorStore((state) => state.setErrorType);

  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async (token?: string) => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await adminProductApi.getProducts({accessToken: token || accessToken});
      initProducts(data);
    } catch (err) {
      if (err instanceof UnAuthorizedException) {
        router.push('/reservation/login');
        return;
      }
      setErrorType(ErrorType.Unknown);
    } finally {
      setLoading(false);
    }
  }, [initProducts, loading, setErrorType, accessToken, router]);

  const createProduct = useCallback(async (name: string, price: number, spendMinute: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const product = await adminProductApi.postProduct({
        accessToken, name, price, spendMinute,
      });
      addProduct(product);
    } catch (err) {
      if (err instanceof UnAuthorizedException) {
        router.push('/reservation/login');
        return;
      }
      setErrorType(ErrorType.Unknown);
    } finally {
      setLoading(false);
    }
  }, [addProduct, loading, setErrorType, accessToken, router]);

  const deleteProductById = useCallback(async (id: string) => {
    if (loading) return;
    setLoading(true);
    try {
      await adminProductApi.deleteProduct({id, accessToken});
      deleteProduct(id);
    } catch (err) {
      if (err instanceof UnAuthorizedException) {
        router.push('/reservation/login');
        return;
      }
      setErrorType(ErrorType.Unknown);
    } finally {
      setLoading(false);
    }
  }, [deleteProduct, loading, setErrorType, accessToken, router]);

  const updateProductById = useCallback(async (id: string, name: string, price: number) => {
    if (loading) return;
    setLoading(true);
    try {
      await adminProductApi.patchProduct({
        id, name, price, accessToken,
      });
      updateProduct(id, name, price);
    } catch (err) {
      if (err instanceof UnAuthorizedException) {
        router.push('/reservation/login');
        return;
      }
      setErrorType(ErrorType.Unknown);
    } finally {
      setLoading(false);
    }
  }, [updateProduct, loading, setErrorType, accessToken, router]);

  return {
    products, fetchProducts, createProduct, deleteProductById, updateProductById, loading,
  };
};
