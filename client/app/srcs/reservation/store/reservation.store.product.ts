import { create } from 'zustand';
import { Product } from '../dto/reservation.dto.product';

export type ProductState = {
  products: Product[];
  initProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (id: string, name: string, price: number) => void;
};
export const useProductStore = create<ProductState>((set) => ({
  products: [],
  initProducts: (products: Product[]) => set({ products }),
  addProduct: (product: Product) => set(({ products }) => ({
    products: [...products, { ...product }],
  })),
  deleteProduct: (id: string) => set(({ products }) => ({
    products: products.filter((product) => product.id !== id),
  })),
  updateProduct: (id: string, name: string, price: number) => set(({ products }) => ({
    products: products.map(
      (product) => (product.id === id ? { ...product, name, price } : product),
    ),
  })),
}));
