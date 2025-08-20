import React, { useCallback } from 'react';
import { DropdownMenuType, useDropdownMenu } from '../../store/reservation.store.dropdownmenu';
import { useReservation } from '../../hooks/reservation.hook.reservation';
import { Reservation } from '../../dto/reservation.dto.reservation';

export type ControlReservationProps = {
  reservation: Reservation;
};
const ControlReservation: React.FC<ControlReservationProps> = ({ reservation }) => {
  const setDropdownMenuType = useDropdownMenu((state) => state.setDropdownMenuType);
  const {fetchReservations, deleteReservationById} = useReservation();

  const deleteReservation = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteReservationById(reservation.id);
    await fetchReservations({});
    setDropdownMenuType(DropdownMenuType.None);
  }, [fetchReservations, deleteReservationById, reservation.id, setDropdownMenuType]);

  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <button
        type="button"
        onClick={deleteReservation}
      >
        삭제
      </button>
    </div>
  );
};

export default ControlReservation;
