/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import { useStaff } from '../hooks/reservatio.hook.staff';
import { DropdownMenuType, useDropdownMenu } from '../store/reservation.store.dropdownmenu';

type Props = {};
const StaffList: React.FC<Props> = () => {
  const { fetchStaffs, staffs } = useStaff();
  const setDropdownMenuType = useDropdownMenu((state) => state.setDropdownMenuType);
  const setPosition = useDropdownMenu((state) => state.setPosition);
  const setProps = useDropdownMenu((state) => state.setProps);

  useEffect(() => {
    fetchStaffs();
  }, []);

  const handleDropdownMenu = useCallback((e: React.MouseEvent, staffId: string) => {
    e.stopPropagation();
    setProps({ staffId });
    setPosition(e.clientX, e.clientY);
    setDropdownMenuType(DropdownMenuType.controlStaff);
  }, [setDropdownMenuType, setPosition, setProps]);

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
