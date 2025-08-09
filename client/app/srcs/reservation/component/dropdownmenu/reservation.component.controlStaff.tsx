import React, { useCallback } from 'react';
import { DropdownMenuType, useDropdownMenu } from '../../store/reservation.store.dropdownmenu';
import { useStaff } from '../../hooks/reservatio.hook.staff';

export type DropdownMenuProps = {
  staffId: string;
};
const ControlStaff: React.FC<DropdownMenuProps> = ({ staffId }) => {
  const setDropdownMenuType = useDropdownMenu((state) => state.setDropdownMenuType);
  const {deleteStaffById} = useStaff();
  const deleteStaff = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    deleteStaffById(staffId);
    setDropdownMenuType(DropdownMenuType.None);
  }, [deleteStaffById, setDropdownMenuType, staffId]);

  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <button
        type="button"
        onClick={deleteStaff}
      >
        삭제
      </button>
    </div>
  );
};

export default ControlStaff;
