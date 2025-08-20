import React from 'react';
import NailList from '../reservation.component.nailList';
import { ModalType, useModalStore } from '../../store/reservation.store.modal';

const NailPannel: React.FC = () => {
  const setModalType = useModalStore((state) => state.setModalType);

  return (
    <div>
      <h2>Nail Panel</h2>
      <NailList />
      <button
        type="button"
        onClick={() => setModalType(ModalType.AddNail)}
        className="rounded-sm border-2 border-gray-300 bg-white px-4 py-2 text-sm"
      >
        Add Nail
      </button>

    </div>
  );
};

export default NailPannel;
