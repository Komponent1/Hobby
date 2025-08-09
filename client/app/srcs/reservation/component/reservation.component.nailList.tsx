/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import { DropdownMenuType, useDropdownMenu } from '../store/reservation.store.dropdownmenu';
import { useNail } from '../hooks/reservation.hook.nail';

type Props = {};
const NailList: React.FC<Props> = () => {
  const { fetchNails, nails } = useNail();
  const setDropdownMenuType = useDropdownMenu((state) => state.setDropdownMenuType);
  const setPosition = useDropdownMenu((state) => state.setPosition);
  const setProps = useDropdownMenu((state) => state.setProps);

  useEffect(() => {
    fetchNails();
  }, []);

  const handleDropdownMenu = useCallback((e: React.MouseEvent, nailId: string) => {
    e.stopPropagation();
    setProps({ nailId });
    setPosition(e.clientX, e.clientY);
    setDropdownMenuType(DropdownMenuType.controlNail);
  }, [setDropdownMenuType, setPosition, setProps]);

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
