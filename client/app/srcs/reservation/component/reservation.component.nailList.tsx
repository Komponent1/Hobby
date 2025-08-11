/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import { DropdownMenuType, useDropdownMenu } from '../store/reservation.store.dropdownmenu';
import { useNail } from '../hooks/reservation.hook.nail';

type Props = {};
const NailList: React.FC<Props> = () => {
  const { fetchNails, nails } = useNail();
  const setDropdownMenuType = useDropdownMenu((state) => state.setDropdownMenuType);

  useEffect(() => {
    fetchNails();
  }, []);

  const handleDropdownMenu = useCallback((e: React.MouseEvent, nailId: string) => {
    e.stopPropagation();
    setDropdownMenuType(
      DropdownMenuType.controlNail,
      { x: e.clientX, y: e.clientY },
      { nailId },
    );
  }, [setDropdownMenuType]);

  return (
    <div>
      <h2>Nail List</h2>
      <ul>
        {nails.map((nail) => (
          <li key={nail.id}>
            {nail.name}
            <span>{nail.price}</span>
            <button
              type="button"
              onClick={(e) => handleDropdownMenu(e, nail.id)}
            >
              Control
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NailList;
