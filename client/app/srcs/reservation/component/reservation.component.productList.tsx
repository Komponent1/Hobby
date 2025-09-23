import React, { useCallback } from 'react';
import { DropdownMenuType, useDropdownMenu } from '../store/reservation.store.dropdownmenu';
import { useProduct } from '../hooks/reservation.hook.product';

type Props = {};
const ProductList: React.FC<Props> = () => {
  const { products } = useProduct();
  const setDropdownMenuType = useDropdownMenu((state) => state.setDropdownMenuType);

  const handleDropdownMenu = useCallback((e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    setDropdownMenuType(
      DropdownMenuType.controlProduct,
      { x: e.clientX, y: e.clientY },
      { productId },
    );
  }, [setDropdownMenuType]);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}
            <span>{product.price}</span>
            <button
              type="button"
              onClick={(e) => handleDropdownMenu(e, product.id)}
            >
              Control
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
