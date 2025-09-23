import React, { useCallback } from 'react';
import { DropdownMenuType, useDropdownMenu } from '../../store/reservation.store.dropdownmenu';
import { useProduct } from '../../hooks/reservation.hook.product';

export type ControlProductProps = {
  productId: string;
};
const ControlProduct: React.FC<ControlProductProps> = ({ productId }) => {
  const setDropdownMenuType = useDropdownMenu((state) => state.setDropdownMenuType);
  const { deleteProductById } = useProduct();
  const deleteProduct = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    deleteProductById(productId);
    setDropdownMenuType(DropdownMenuType.None);
  }, [deleteProductById, setDropdownMenuType, productId]);

  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <button
        type="button"
        onClick={deleteProduct}
      >
        삭제
      </button>
    </div>
  );
};

export default ControlProduct;
