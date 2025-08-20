import React, { useCallback } from 'react';
import { DropdownMenuType, useDropdownMenu } from '../../store/reservation.store.dropdownmenu';
import ControlStaff from './reservation.component.controlStaff';
import ControlNail from './reservation.component.controlNail';
import ControlReservation from './reservation.component.controlReservation';

const DropdownMenu: React.FC = () => {
  const props = useDropdownMenu((state) => state.props);
  const dropdownMenuType = useDropdownMenu((state) => state.dropdownMenuType);
  const setDropdownMenuType = useDropdownMenu((state) => state.setDropdownMenuType);
  const position = useDropdownMenu((state) => state.position);

  const handleClose = useCallback(() => {
    setDropdownMenuType(DropdownMenuType.None);
  }, [setDropdownMenuType]);

  if (dropdownMenuType === DropdownMenuType.None) return null;
  return (
    <button type="button" className="absolute top-0 h-full w-full opacity-100 z-30" onClick={handleClose}>
      <div
        className="absolute opacity-100"
        style={{ top: position.y, left: position.x }}
      >
        {dropdownMenuType === DropdownMenuType.controlStaff && <ControlStaff {...props} />}
        {dropdownMenuType === DropdownMenuType.controlNail && <ControlNail {...props} />}
        {dropdownMenuType === DropdownMenuType.controlReservation
          && <ControlReservation {...props} />}
      </div>
    </button>
  );
};

export default DropdownMenu;
