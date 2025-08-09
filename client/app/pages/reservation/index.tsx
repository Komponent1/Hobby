import React from 'react';
import ReservationPage from '../../srcs/reservation/reservation.page';
import {getReservationProps} from '../../srcs/reservation/reservation.props';

type ServerSideProps = {

};
const Reservation: React.FC<ServerSideProps> = () => <ReservationPage />;

export default Reservation;

export async function getServerSideProps() {
  const data = await getReservationProps();

  return data;
}
