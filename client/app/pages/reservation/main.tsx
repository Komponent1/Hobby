import React from 'react';
import ReservationPage from '../../srcs/reservation/reservation.main.page';
import {getReservationProps} from '../../srcs/reservation/reservation.props';

type ServerSideProps = {

};
const ReservationMain: React.FC<ServerSideProps> = () => <ReservationPage />;

export default ReservationMain;

export async function getServerSideProps() {
  const data = await getReservationProps();

  return data;
}
