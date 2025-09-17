import React from 'react';
import { ModalType, useModalStore } from '../store/reservation.store.modal';
import { BottomSlideType, useBottomSlide } from '../store/reservation.store.bottomSlide';
import { Icon } from '../../common/common.components';

const BottomTab: React.FC = () => {
  const setModalType = useModalStore((state) => state.setModalType);
  const setBottomSlideType = useBottomSlide((state) => state.setBottomSlideType);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-[0_-10px_10px_-10px_rgba(0,0,0,0.5)]">
      <div className="flex justify-between p-4 md:w-1/2 lg:w-1/3 mx-auto">
        <Icon
          name="people_fill"
          size={32}
          onClick={() => setBottomSlideType(BottomSlideType.Staff)}
        />
        <Icon
          name="calendar_plus_fill"
          size={32}
          onClick={() => setModalType(ModalType.AddReservation)}
        />
        <Icon
          name="cart4"
          size={32}
          onClick={() => setBottomSlideType(BottomSlideType.Nail)}
        />
      </div>
    </div>
  );
};

export default BottomTab;
