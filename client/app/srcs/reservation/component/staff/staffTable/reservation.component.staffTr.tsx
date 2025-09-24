import React, { useCallback } from 'react';
import { Staff } from '../../../dto/reservation.dto.staff';
import { Icon } from '../../../../common/common.components';
import { DropdownMenuType, useDropdownMenu } from '../../../store/reservation.store.dropdownmenu';

type Props = {
  staff: Staff;
  odd: boolean;
};
const StaffTr: React.FC<Props> = ({ staff, odd }) => {
  const setDropdownMenuType = useDropdownMenu((state) => state.setDropdownMenuType);
  const handleDropdownMenu = useCallback((e: React.MouseEvent, staffId: string) => {
    e.stopPropagation();
    setDropdownMenuType(
      DropdownMenuType.controlStaff,
      { x: e.clientX, y: e.clientY },
      { staffId },
    );
  }, [setDropdownMenuType]);

  return (
    <tr style={{backgroundColor: odd ? '#efefef' : '#fefefe'}}>
      <td className="px-6 py-3 text-left">{staff.name}</td>
      <td className="px-6 py-3 justify-end flex">
        <Icon
          name="three_dots_vertical"
          size={16}
          onClick={(e) => handleDropdownMenu(e, staff.id)}
        />
      </td>
    </tr>
  );
};

export default StaffTr;
