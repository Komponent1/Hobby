import React, { useCallback } from 'react';
import { DropdownMenuType, useDropdownMenu } from '../../store/reservation.store.dropdownmenu';
import { useNail } from '../../hooks/reservation.hook.nail';

export type DropdownMenuProps = {
  nailId: string;
};
const ControlNail: React.FC<DropdownMenuProps> = ({ nailId }) => {
  const setDropdownMenuType = useDropdownMenu((state) => state.setDropdownMenuType);
  const {deleteNailById} = useNail();
  const deleteNail = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNailById(nailId);
    setDropdownMenuType(DropdownMenuType.None);
  }, [deleteNailById, setDropdownMenuType, nailId]);

  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <button
        type="button"
        onClick={deleteNail}
      >
        삭제
      </button>
    </div>
  );
};

export default ControlNail;
