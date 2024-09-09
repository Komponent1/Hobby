import React from 'react';
import { getSteamLoungeProps } from '../../srcs/steamlounge/steam.props';
import { GameAnalysticData } from '../../srcs/steamlounge/dto/game';
import SteamLoungePage from '../../srcs/steamlounge/steamlouge.page';

type Props = {
  gameinfos: GameAnalysticData[];
};
const SteamLounge: React.FC<Props> = ({gameinfos}) => (
  <SteamLoungePage gameDatas={gameinfos} />
);

export default SteamLounge;

export async function getServerSideProps() {
  const data = await getSteamLoungeProps();

  return data;
}
