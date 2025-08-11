/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import { useStaff } from '../hooks/reservatio.hook.staff';
import { DropdownMenuType, useDropdownMenu } from '../store/reservation.store.dropdownmenu';

type Props = {};
const StaffList: React.FC<Props> = () => {
  const { fetchStaffs, staffs } = useStaff();
  const setDropdownMenuType = useDropdownMenu((state) => state.setDropdownMenuType);

  useEffect(() => {
    fetchStaffs();
  }, []);

  const handleDropdownMenu = useCallback((e: React.MouseEvent, staffId: string) => {
    e.stopPropagation();
    setDropdownMenuType(
      DropdownMenuType.controlStaff,
      { x: e.clientX, y: e.clientY },
      { staffId },
    );
  }, [setDropdownMenuType]);

  return (
    <div>
      <h2>Staff List</h2>
      <ul>
        {staffs.map((staff) => (
          <li key={staff.id}>
            {staff.name}
            <button
              type="button"
              onClick={(e) => handleDropdownMenu(e, staff.id)}
            >
              Control
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StaffList;
