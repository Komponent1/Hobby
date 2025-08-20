import React from 'react';
import { ModalType, useModalStore } from '../store/reservation.store.modal';
import { BottomSlideType, useBottomSlide } from '../store/reservation.store.bottomSlide';

const BottomTab: React.FC = () => {
  const setModalType = useModalStore((state) => state.setModalType);
  const setBottomSlideType = useBottomSlide((state) => state.setBottomSlideType);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow rounded-t-2xl border-2">
      <div className="flex justify-center p-4">
        <button
          type="button"
          onClick={() => setBottomSlideType(BottomSlideType.Staff)}
          className="rounded-sm border-2 border-gray-300 bg-white px-4 py-2 text-sm"
        >
          Add Staff
        </button>
        <button
          type="button"
          onClick={() => setModalType(ModalType.AddReservation)}
          className="rounded-sm border-2 border-gray-300 bg-white px-4 py-2 text-sm"
        >
          Add Reservation
        </button>
        <button
          type="button"
          onClick={() => setBottomSlideType(BottomSlideType.Nail)}
          className="rounded-sm border-2 border-gray-300 bg-white px-4 py-2 text-sm"
        >
          Add Nail
        </button>
      </div>
    </div>
  );
};

export default BottomTab;
