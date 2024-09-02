import React from 'react';
import { getSteamLoungeProps } from '../srcs/steamlounge/steam.props';

type Props = {
  gameinfos: any;
};
const SteamLounge: React.FC<Props> = ({gameinfos}) => (
  <div>
    <h1>SteamLounge</h1>
  </div>
);

export default SteamLounge;

export async function getServerSideProps() {
  const data = await getSteamLoungeProps();

  return data;
}
