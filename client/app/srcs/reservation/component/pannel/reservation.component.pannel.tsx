import React from 'react';
import { PannelType } from '../reservation.component.enum';
import ReservationPannel from './reservation.component.reservationPannel';
import StaffPannel from './reservation.component.staffPannel';
import ProductPannel from './reservation.component.productPannel';

type Props = {
  currentPanel: PannelType;
};
const Pannel: React.FC<Props> = ({ currentPanel }) => {
  let content;
  if (currentPanel === PannelType.RESERVATION) {
    content = <ReservationPannel currentPanel={currentPanel} />;
  } else if (currentPanel === PannelType.STAFF) {
    content = <StaffPannel currentPanel={currentPanel} />;
  } else {
    content = <ProductPannel currentPanel={currentPanel} />;
  }

  return (
    <div className="w-full h-full">
      {content}
    </div>
  );
};

export default Pannel;
