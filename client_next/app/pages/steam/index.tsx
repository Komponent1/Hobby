import React from 'react';
import { getSteamProps } from '../../srcs/steam/steam.props';
import {SteamPageContainer} from '../../srcs/steam/steam.page.container';

const Steam: React.FC = () => (
  <SteamPageContainer />
);

export default Steam;

export async function getServerSideProps() {
  const data = await getSteamProps();

  return data;
}
