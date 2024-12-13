import React from 'react';
import { getSteamProps } from '../../srcs/steam/steam.props';
import { GameAnalysticData } from '../../srcs/steam/dto/game';
import SteamPage from '../../srcs/steam/steam.page';

type Props = {
  gameinfos: GameAnalysticData[];
};
const Steam: React.FC<Props> = ({gameinfos}) => (
  <SteamPage gameDatas={gameinfos} />
);

export default Steam;

export async function getServerSideProps() {
  const data = await getSteamProps();

  return data;
}
